Feature: TimesheetManagement

    Scenario: User navigates to TimesheetManagement
        Given I am a User loading TimesheetManagement
        When I navigate to the TimesheetManagement
        Then TimesheetManagement will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors