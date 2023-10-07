Feature: CvresumeCandidateTemplateList

    Scenario: User navigates to CvresumeCandidateTemplateList
        Given I am a User loading CvresumeCandidateTemplateList
        When I navigate to the CvresumeCandidateTemplateList
        Then CvresumeCandidateTemplateList will load with out errors
        And component did mount get reponse success
        And flat list render success
        And I can leave the screen with out errors