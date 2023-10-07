Feature: TimeSheetCreateTask

    Scenario: User navigates to TimeSheetCreateTask
        Given I am a User loading TimeSheetCreateTask
        When I navigate to the TimeSheetCreateTask
        Then TimeSheetCreateTask will load with out errors
        And User will add data into all textInputs and validate them
        And User will call create task api
        And User can navigate to back screen on cancel click
        And keyboard will hide while touch outside of input area