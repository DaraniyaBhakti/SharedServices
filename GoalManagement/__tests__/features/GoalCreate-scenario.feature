Feature: GoalCreate

  Scenario: User navigates to GoalCreate
    Given I am a User loading GoalCreate
    When I navigate to the GoalCreate
    Then GoalCreate will load with out errors
    And I can leave GoalCreate with out errors