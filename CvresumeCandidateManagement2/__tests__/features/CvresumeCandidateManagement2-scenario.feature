Feature: CvresumeCandidateManagement2

    Scenario: User navigates to CvresumeCandidateManagement2
        Given I am a User loading CvresumeCandidateManagement2
        When I navigate to the CvresumeCandidateManagement2
        Then first handle login user called and get auth token
        And first handle login user called and failed
        And login and get the candidate details failed
        And login and get the candidate details success
        And CvresumeCandidateManagement2 will load with out errors
        And token is directly availble in session storage and get the null data
        And token is directly availble in session storage and get the data
        And get the resumes after get candidates details
        And get the resumes after get candidates details failed
        When user render all resume
        Then user can view resume
        And user can edit resume
        And change text input and submit
        And filled all input and submit
        And user can edit and update resume successfully
        And user can edit and update resume
        And user can trash resume
        And user can trash resume success
        And clicked on eye options
        And button edit profile page
        And handle validation add profile
        And user can select file and submit
        And to hide the keyboard
        And search by name
        And filter by dropdown
        And render button
        And API get edit add profile response success
        And API get edit add profile response failed
        And toggle add resumes clicked and called
        And called remaining function
        And all functions remining
        And I can leave the screen with out errors