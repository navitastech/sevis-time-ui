require 'selenium-webdriver'
Before do |scenario|
  puts 'before hook'
  $driver = Selenium::WebDriver.for :chrome

  $wait = Selenium::WebDriver::Wait.new(:timeout => 5) # seconds
  puts 'end before hook'
end

After do |scenario|
  $driver.quit
end
