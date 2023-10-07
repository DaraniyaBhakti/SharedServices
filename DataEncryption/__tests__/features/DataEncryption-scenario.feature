Feature: DataEncryption

    Scenario: User navigates to DataEncryption
        Given I am a User loading DataEncryption
        When I navigate to the DataEncryption
        Then DataEncryption will load with out errors
        And I can select the touchable without feedback with without errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And Login API load with out errors
        And String encryption API load with out errors
        And String decryption API load with out errors
        And File encryption API load with out errors
        And File decryption API load with out errors
        And Folder encryption API load with out errors
        And Folder decryption API load with out errors
        And I can leave the screen with out errors