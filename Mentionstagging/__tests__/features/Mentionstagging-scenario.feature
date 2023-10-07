Feature: Mentionstagging

    Scenario: User navigates to Mentionstagging
        Given I am a User loading Mentionstagging
        When I navigate to the Mentionstagging
        Then Mentionstagging will load with out errors
        And I can select the touchable without feedback with without errors
        And I can select the button with without errors
        And I can select the flat list with with out errors
        And I can select the floating action button with with out errors
        And I can select Post Item with with out errors
        And Login API load with out errors
        And Post List API load with out errors
        And User list data load with out errors
        And I can leave the screen with out errors
