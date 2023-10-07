Feature: BudgetingForecasting

    Scenario: User navigates to BudgetingForecasting
        Given I am a User loading BudgetingForecasting
        When I navigate to the BudgetingForecasting
        Then BudgetingForecasting will load with out errors
        And I can leave the screen with out errors