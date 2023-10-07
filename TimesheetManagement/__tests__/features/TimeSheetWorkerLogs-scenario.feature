Feature: TimeSheetWorkerLogs

    Scenario: User navigates to TimeSheetWorkerLogs
        Given I am a User loading TimeSheetWorkerLogs
        When I navigate to the TimeSheetWorkerLogs
        Then TimeSheetWorkerLogs will load with out errors
        And User will search data from list using search input
        And User will call task details api
        And Details with List api response set to list