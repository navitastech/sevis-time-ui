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
