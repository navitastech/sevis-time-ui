require 'selenium-webdriver'
$driver
$wait
# default URL. pass in a custom URL from the command line with: cucumber URL="[url to test on]"
$baseUrl = "http://flashwebapplb-1223457194.us-east-1.elb.amazonaws.com/"

Given(/^the user is on the login screen$/) do

  # configure from command line
  if ENV['URL'].to_s.length != 0
    $baseUrl = ENV['URL']
  end
  $driver.navigate.to $baseUrl
end

When(/^the user enters a valid first name of (.*)$/) do |firstname|
  $driver.find_element(:id, 'password').send_keys("#{firstname}")
end

When(/^the user enters a valid last name of (.*)$/) do |lastname|
  $driver.find_element(:id, 'username').send_keys("#{lastname}")
end

When(/^the user enters an invalid first name of (.*)$/) do |invalidfirstname|
  $driver.find_element(:id, 'password').send_keys("#{invalidfirstname}")
end

When(/^the user enters an invalid last name of (.*)$/) do |invalidlastname|
  $driver.find_element(:id, 'username').send_keys("#{invalidlastname}")
end

When(/^the user clicks the login submit button$/) do
  $driver.find_element(:id, 'submitBtn').click()
end

Then(/^the system displays the application home page$/) do
  $driver.find_element(:id, 'firstName').displayed?
  $driver.find_element(:id, 'lastName').displayed?
  $driver.find_element(:id, 'addUserSubmit').displayed?
end

Then(/^the system displays an error message that reads (.*)$/) do |errormessage|
  begin
    element = $wait.until { $driver.find_element(:id => "error") }
    expect(element.text).to eq("#{errormessage}")
  ensure
    #nothing
  end
end

Then(/^the login screen is displayed$/) do
  $wait.until { $driver.find_element(:id, 'username') }
  $wait.until { $driver.find_element(:id, 'password') }
  $wait.until { $driver.find_element(:id, 'submitBtn') }
end

When(/^the user clicks the Log Out button$/) do
  element = $wait.until{ $driver.find_element(:id, 'submitBtn') }
  expect(element.attribute("value")).to eq("Log Out")
  element.click()
end

When(/^the user navigates to the kudos page$/) do
  $driver.navigate.to ($baseUrl + "/kudos?recievedId=2")
end

Then(/^the user sees the kudos comments form$/) do
  $wait.until { $driver.find_element(:id => "kudosText") }
end

When(/^the user fills out the kudos comments form with (.*)$/) do |fieldText|
  kudosTextField = $wait.until { $driver.find_element(:id => "kudosText") }
  kudosTextField.send_keys("#{fieldText}")
end

When(/^the user chooses (.*) from the dropdown$/) do |rating|
  kudosDropdown = $wait.until { $driver.find_element(:id => "kudosRating") }
  option = Selenium::WebDriver::Support::Select.new(kudosDropdown)
  option.select_by(:text, "#{rating}")
end

When(/^the user clicks the kudos form submit button$/) do
  $driver.find_element(:id, 'kudosSubmitBtn').click()
end

Then(/^the kudos success message is displayed and says (.*)$/) do |successmessage|
  message = $driver.find_element(:id, 'successMessage')
  expect(message.text).to include("#{successmessage}")
end

When(/^the user adds the name (.*) (.*) into the Add User form$/) do |firstname, lastname|
  firstNameField = $wait.until { $driver.find_element(:id => "firstName") }
  firstNameField.send_keys("#{firstname}")
  lastNameField = $wait.until { $driver.find_element(:id => "lastName") }
  lastNameField.send_keys("#{lastname}")
end

When(/^the user submits the Add User form$/) do
  $driver.find_element(:id, 'addUserSubmit').click()
end

#
# Summary steps to keep feature files readable
#

Given(/^(.*) (.*) is signed in$/) do |firstname, lastname|
  step "the user is on the login screen"
  step "the user enters a valid first name of #{firstname}"
  step "the user enters a valid last name of #{lastname}"
  step "the user clicks the login submit button"
end

Then(/^(.*) (.*) is added to the system$/) do |firstname, lastname|
  step "the user clicks the Log Out button"
  step "the user is on the login screen"
  step "the user enters a valid first name of #{firstname}"
  step "the user enters a valid last name of #{lastname}"
  step "the user clicks the login submit button"
  step "the system displays the application home page"
end
