Feature: CentralisedBilling

    Scenario: User navigates to CentralisedBilling
        Given I am a User loading CentralisedBilling
        When I navigate to the CentralisedBilling
        Then CentralisedBilling will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors