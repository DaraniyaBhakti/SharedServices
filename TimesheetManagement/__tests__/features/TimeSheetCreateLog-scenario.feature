Feature: TimeSheetCreateLog

    Scenario: User navigates to TimeSheetCreateLog
        Given I am a User loading TimeSheetCreateLog
        When I navigate to the TimeSheetCreateLog
        Then TimeSheetCreateLog will load with out errors
        And User will add data into all textInputs and validate them
        And User will call create task api
        And User can navigate to back screen on cancel click
        And keyboard will hide while touch outside of input area