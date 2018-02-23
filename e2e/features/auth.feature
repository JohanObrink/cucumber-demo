Feature: Authentication

  A user should be able to authenticate

  Background:
  Given The following users exist in the database
    | id  | username          | password            | firstName | lastName    |
    | 1   | johanobrink       | my_password         | Johan     | Öbrink      |
    | 2   | kiwiholmberg      | some_other_password | Kiwi      | Holmberg    |
    | 3   | dennispettersson  | a_stupid_password   | Dennis    | Pettersson  |
  
  Scenario: Wrong username
    When I try to login with the username "fabio" and the password "herp derp"
    Then I should see the login page
    And There should be one error saying "Wrong username or password"
  
  Scenario: Wrong password
    When I try to login with the username "johanobrink" and the password "herp derp"
    Then I should see the login page
    And There should be one error saying "Wrong username or password"
  
  Scenario: Succesful login
    When I try to login with the username "johanobrink" and the password "my_password"
    Then I should see the profile page
    And The headline should be "Welcome Johan!"