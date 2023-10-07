Feature: TimesheetManagement

    Scenario: User navigates to TimesheetManagement
        Given I am a User loading TimesheetManagement
        When I navigate to the TimesheetManagement
        Then TimesheetManagement will load with out errors
        And I can navigate to Task View screen by clicking button of ViewTask
        And I can navigate to Time Sheet screen by clicking button of ViewTimeSheet