Feature: GoalDetail

  Scenario: User navigates to GoalDetail
    Given I am a User loading GoalDetail
    When I navigate to the GoalDetail
    Then GoalDetail will load with out errors
    And I can leave GoalDetail with out errors