Feature: OrganisationHierarchy

    Scenario: User navigates to OrganisationHierarchy
        Given I am a User loading OrganisationHierarchy
        When I navigate to the OrganisationHierarchy
        Then OrganisationHierarchy will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors