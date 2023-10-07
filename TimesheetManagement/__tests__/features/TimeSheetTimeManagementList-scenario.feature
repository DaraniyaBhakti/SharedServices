Feature: TimeSheetTimeManagementList

    Scenario: User navigates to TimeSheetTimeManagementList
        Given I am a User loading TimeSheetTimeManagementList
        When I navigate to the TimeSheetTimeManagementList
        Then TimeSheetTimeManagementList will load with out errors
        And User can navigate to task worker logs on list click
        And User will search data from list using search input
        And User load all dates without error
        And User load all months without error
        And User render page list
        And User can open Calendar modal and select date and month
        And User will call task list api
        And all remaining methods work properly