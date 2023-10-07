Feature: GoalDetailWeb

  Scenario: User navigates to GoalDetailWeb
    Given I am a User loading GoalDetailWeb
    When I navigate to the GoalDetailWeb
    Then GoalDetailWeb will load with out errors
    And I can leave GoalDetailWeb with out errors
