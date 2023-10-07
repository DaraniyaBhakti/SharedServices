Feature: MentionstaggingAddPost

    Scenario: User navigates to MentionstaggingAddPost
        Given I am a User loading MentionstaggingAddPost
        When I navigate to the MentionstaggingAddPost
        Then MentionstaggingAddPost will load with out errors
        And User list data load with out errors
        And I can select the touchable without feedback with without errors
        And I can enter text in fields without errors
        And I can select the user tag button without errors
        And I can select the save button with without errors
        And I can select the username flat list with with out errors
        And I can open the user list modal without errors
        And Post details load with out errors
        And Create Post data load with out errors
        And Update Post data load with out errors
        And Delete Post data load with out errors
        And I can leave the screen with out errors
