Feature: CvresumeCandidateList

    Scenario: User navigates to CvresumeCandidateList
        Given I am a User loading CvresumeCandidateList
        When I navigate to the CvresumeCandidateList
        Then CvresumeCandidateList will load with out errors
        Then render component did mount and get the token and get templates
        And getting reumes with success
        And hide keyboard test
        And render button
        And clicked on button view candidate
        And I can leave the screen with out errors