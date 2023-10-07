Feature: GoalCreateWeb

  Scenario: User navigates to GoalCreateWeb
    Given I am a User loading GoalCreateWeb
    When I navigate to the GoalCreateWeb
    Then GoalCreateWeb will load with out errors
    And I can leave GoalCreateWeb with out errors
