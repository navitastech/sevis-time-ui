class Env
  def initialize
  end

  def getSiteURL
    if ENV['ENVIRONMENT'] != nil
      return $params["environments"][ENV['ENVIRONMENT']]["baseUrl"]
    else
      # Defaut to dev
      return $params["environments"]["dev"]["baseUrl"]
    end
  end

  def isLocal
    return (ENV['ENVIRONMENT'] == 'local' || ENV['ENVIRONMENT'] == 'localdev')
  end

  def getApiURL
    if ENV['ENVIRONMENT'] != nil
      return $params["environments"][ENV['ENVIRONMENT']]["apiUrl"]
    else
      # Defaut to dev
      return $params["environments"]["dev"]["apiUrl"]
    end
  end

  def getDriver
    $useGrid = true
    caps = Selenium::WebDriver::Remote::Capabilities.new
    newWebdriver = nil
    if ENV['GRID'] != nil
      $useGrid = ENV['GRID'] == "true"
    end
    if ENV['BROWSER'] != nil
      if ENV['BROWSER'] == "firefox"
        if $useGrid
          profile = Selenium::WebDriver::Firefox::Profile.new
          profile['geo.enabled'] = false
          profile['geo.provider.use_corelocation'] = false
          profile['geo.prompt.testing'] = false
          profile['geo.prompt.testing.allow'] = false
          caps['browserName'] = "firefox"
          caps.firefox_profile = profile
          newWebdriver = Selenium::WebDriver.for(:remote, :url => $params["selenium-grid"], :desired_capabilities => caps)
        else
          newWebdriver = Selenium::WebDriver.for :firefox
        end
      elsif ENV['BROWSER'] == "ie"
        if $useGrid
          caps['browserName'] = "internet explorer"
          caps['ie.ensureCleanSession'] = true
          caps['JavascriptEnabled'] = true
          caps['ignoreZoomSetting'] = true
          caps['ignoreProtectedModeSettings'] = true
          newWebdriver = Selenium::WebDriver.for(:remote, :url => $params["selenium-grid"], :desired_capabilities => caps)
        else
          newWebdriver = Selenium::WebDriver.for :ie
        end
      else
        if $useGrid
          caps['browserName'] = "chrome"
          newWebdriver = Selenium::WebDriver.for(:remote, :url => $params["selenium-grid"], :desired_capabilities => caps)
        else
          newWebdriver = Selenium::WebDriver.for :chrome
        end
      end
    else
      # Chrome is default
      if $useGrid
        caps['browserName'] = 'chrome'
        newWebdriver = Selenium::WebDriver.for(:remote, :url => $params["selenium-grid"], :desired_capabilities => caps)
      else
        newWebdriver = Selenium::WebDriver.for :chrome
      end
      ENV['BROWSER'] = "chrome"
    end

    if $useGrid
      newWebdriver.file_detector = lambda do |args|
        # args => ["/path/to/file"]
        str = args.first.to_s
        str if File.exist?(str)
      end
    end

    return newWebdriver
  end

end
