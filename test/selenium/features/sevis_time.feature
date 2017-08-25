Feature: Employee Time Tracking App

Scenario: As an authenticated employee, I want to enter my hours for the week
  Validate that user can enter their hours and view they were saved

  Given the User (employee/supervisor) is logged in page to the timesheet application
  When User selects and enters week of the year to report hours
  Then the hours entered are persisted into the application

Scenario: As a supervisor, I want to approve my employees’ timesheet
  Validate that supervisor can approve hours entered by an employee

  Given the Supervisor is logged in page to the timesheet application
  When the Supervisor selects employee hyperlink from a list of employees as hyperlinks with Last name, First name the system will display employee timesheet page
  Then the Supervisor will approve or reject timesheet for the week

Scenario: As a supervisor, I want to run reports of employees’ hours
  Validate that supervisor can run reports to view hours entered by an employee

  Given the Supervisor is logged in page to the timesheet application
  When the Supervisor selects reports hyperlink
  Then the Supervisor will see the reporting page
  When the Supervisor selects a week from the calendar link
  And the Supervisor clicks the Run Report button
  Then the Supervisor sees all cumulative hours entered from employees that week
