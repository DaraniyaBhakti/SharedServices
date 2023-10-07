Feature: GoalRetrieveWeb

  Scenario: User navigates to GoalRetrieveWeb
    Given I am a User loading GoalRetrieveWeb
    When I navigate to the GoalRetrieveWeb
    Then GoalRetrieveWeb will load with out errors
    And I can leave GoalRetrieveWeb with out errors
