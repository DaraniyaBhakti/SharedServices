Feature: GoalRetrieve

  Scenario: User navigates to GoalRetrieve
    Given I am a User loading GoalRetrieve
    When I navigate to the GoalRetrieve
    Then GoalRetrieve will load with out errors
    And I can leave GoalRetrieve with out errors