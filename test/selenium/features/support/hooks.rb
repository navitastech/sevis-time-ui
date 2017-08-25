Before do |scenario|
  $driver = Selenium::WebDriver.for :firefox
  $wait = Selenium::WebDriver::Wait.new(:timeout => 5) # seconds
end

After do |scenario|
  $driver.quit
end
