Feature: PayrollIntegration2

    Scenario: User navigates to PayrollIntegration2
        Given I am a User loading PayrollIntegration2
        When I navigate to the PayrollIntegration2
        Then PayrollIntegration2 will load with out errors
        Then I can click Selected Tab
        Then User can open modal
        Then User can clear filter data
        Then User can filter data
        Then TextInput field
        Then User can open chart modal
        Then I can click Export Csv Button
        Then I can leave the screen with out errors
