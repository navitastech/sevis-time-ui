Feature: Employee Recognition App

Scenario: As a User, I want to sign in to Application successful so that I can give a point
  Validate that user stay signed in Application so they can successfully give a point and view

  Given the user is on the login screen
  When the user enters a valid last name of user1
  And the user enters a valid first name of pass1
  And the user clicks the login submit button
  Then the system displays the application home page

Scenario: As a User, I want sign in to prevent me from signing in with an invalid First Name
  Validate that user stay signed in Application so they can successfully give a point and view

  Given the user is on the login screen
  When the user enters a valid last name of Smith
  And the user enters an invalid first name of Fake
  And the user clicks the login submit button
  Then the system displays an error message that reads Your credentials are invalid. Please try again.

Scenario: As a User, I want sign in to prevent me from signing in with an invalid Last Name
  Validate that user stay signed in Application so they can successfully give a point and view

  Given the user is on the login screen
  When the user enters an invalid last name of Fakerson
  And the user enters a valid first name of John
  And the user clicks the login submit button
  Then the system displays an error message that reads Your credentials are invalid. Please try again.

Scenario: As a User, I want to add additional Users to that I can give them a point
  Validate that User1 can add User2 to the system

  Given pass1 user1 is signed in
  When the user adds the name Jane Doe into the Add User form
  And the user submits the Add User form
  Then Jane Doe is added to the system

Scenario: As a User, I want to add a new user and give them a point
  Validate that the points are stored

  Given pass1 user1 is signed in
  When the user adds the name Jane Doe into the Add User form
  And the user fills out the kudos comments form with This is an Automated Test comment
  And the user chooses Teamwork from the dropdown
  And the user submits the Add User form
  Then the kudos success message is displayed and says User has been successfully added and been rewarded a point.

# The tests below are from the ICE user stories - once the above tests work with
# existing code, ensure any new functionality from the stories below are folded into the above tests
#
# As an employee/supervisor, I shall be able to register to timesheet application
#
#  1)	Given the User (employee / supervisor) is at the registration page
#  When the User has provided login details - email address, password, first and last name and supervisor (yes/no) flag
#  Then system shall allow registration of new employee/supervisor
#  2)  Given user has successfully registered
#  When the user data is persisted
#  Then registration successful message is shown and user is taken to Timesheet application homepage (Timesheet application homepage has Menu options for enter timesheets, approve timesheet and reports)
#
#  As an employee, I should be able on the log-in page to timesheet application
#
#  1)	Given the User (employee/supervisor) is at the login page
#  When user has supplied valid credentials
#  Then the user is redirected to timesheet entry page
#  2)	Given user is at the login page
#  When the user provides incorrect credentials
#  Then the user remains on the current page and a friendly  error message is displayed prompting the user to try again
