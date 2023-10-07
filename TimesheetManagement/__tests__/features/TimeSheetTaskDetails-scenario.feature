Feature: TimeSheetTaskDetails

    Scenario: User navigates to TimeSheetTaskDetails
        Given I am a User loading TimeSheetTaskDetails
        When I navigate to the TimeSheetTaskDetails
        Then TimeSheetTaskDetails will load with out errors
        And User will call task details api
        And Details with List api response set to list