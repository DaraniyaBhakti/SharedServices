Feature: DataEncryption

    Scenario: User navigates to DataEncryption
        Given I am a User loading DataEncryption
        When I navigate to the DataEncryption
        Then DataEncryption will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors