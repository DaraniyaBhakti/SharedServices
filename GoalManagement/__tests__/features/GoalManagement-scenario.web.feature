Feature: GoalManagement

    Scenario: User navigates to GoalManagement
        Given I am a User loading GoalManagement
        When I navigate to the GoalManagement
        Then GoalManagement will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors