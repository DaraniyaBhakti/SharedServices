Feature: ContentModeration

    Scenario: User navigates to ContentModeration
        Given I am a User loading ContentModeration
        When I navigate to the ContentModeration
        Then ContentModeration will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors