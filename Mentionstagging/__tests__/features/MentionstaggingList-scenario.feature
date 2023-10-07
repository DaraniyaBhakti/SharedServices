Feature: MentionstaggingList

    Scenario: User navigates to MentionstaggingList
        Given I am a User loading MentionstaggingList
        When I navigate to the MentionstaggingList
        Then MentionstaggingList will load with out errors
        And I can select the touchable without feedback with without errors
        And I can select the button with without errors
        And I can select the flat list with with out errors
        And Post List API load with out errors
        And Comment List API load with out errors
        And User list data load with out errors
        And I can leave the screen with out errors
