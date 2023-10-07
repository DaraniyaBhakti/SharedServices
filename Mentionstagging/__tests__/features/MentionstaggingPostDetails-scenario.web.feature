Feature: MentionstaggingPostDetails

    Scenario: User navigates to MentionstaggingPostDetails
        Given I am a User loading MentionstaggingPostDetails
        When I navigate to the MentionstaggingPostDetails
        Then MentionstaggingPostDetails will load with out errors
        And I can select the touchable without feedback with without errors
        And I can select the button with without errors
        And I can select the flat list with with out errors
        And I can select the save comment button with with out errors
        And I can enter comment text without errors
        And User list data load with out errors
        And Get Post details load with out errors
        And Create comment with out errors
        And Delete comment with out errors
        And Update comment with out errors
        And Comment List API load with out errors
        And I can leave the screen with out errors
