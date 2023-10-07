## Building Blocks React Native Mobile -  GoalManagement

Building Blocks - React Native Master App - GoalManagement

## Getting Started
- N/A
### Prerequisites
- The feature of this block is Create, edit and track goals for individuals and teams. Add goal details to remind, motivate, and encourage.
- TrackerId: `872889`

### Git Structure
- `GoalManagement` branch is based on the `mater` branch

### Installing
- Additional dependencies: `react-native-modal`
- Run `yarn` in `src` folder and `src/packages/mobile` folder

## Running the tests
- Run `yarn` to install specific libraries used in **GoalManagement** block
- Then run `yarn test` to run the test with the block
- Unit test coverage result:


| File                                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s |
|---------------------------------------|---------|----------|---------|---------|-------------------|
| All files                             | 97.24   | 92.7     | 91.9    | 97.4    |                   |
| assets                                | 100     | 100      | 100     | 100     |                   |
| arrow-full-right.png                  | 100     | 100      | 100     | 100     |                   |
| arrow-left.png                        | 100     | 100      | 100     | 100     |                   |
| background.png                        | 100     | 100      | 100     | 100     |                   |
| calendar-color-icon.png               | 100     | 100      | 100     | 100     |                   |
| calendar-icon.png                     | 100     | 100      | 100     | 100     |                   |
| class-icon.png                        | 100     | 100      | 100     | 100     |                   |
| clock-icon.png                        | 100     | 100      | 100     | 100     |                   |
| create-goal.png                       | 100     | 100      | 100     | 100     |                   |
| delete-icon.png                       | 100     | 100      | 100     | 100     |                   |
| dropdown-icon.png                     | 100     | 100      | 100     | 100     |                   |
| edit-icon.png                         | 100     | 100      | 100     | 100     |                   |
| goal-item.png                         | 100     | 100      | 100     | 100     |                   |
| ic_password_invisible.png             | 100     | 100      | 100     | 100     |                   |
| ic_password_visible.png               | 100     | 100      | 100     | 100     |                   |
| presentation-icon.png                 | 100     | 100      | 100     | 100     |                   |
| retrieve-goal.png                     | 100     | 100      | 100     | 100     |                   |
| search-icon.png                       | 100     | 100      | 100     | 100     |                   |
| user-icon.png                         | 100     | 100      | 100     | 100     |                   |
| src                                   | 96.47   | 100      | 96      | 96.47   |                   |
| GoalManagement.tsx                    | 100     | 100      | 100     | 100     |                   |
| GoalManagement.web.tsx                | 100     | 100      | 100     | 100     |                   |
| GoalManagementController.tsx          | 92.3    | 100      | 90      | 92.3    | 99-102,118        |
| GoalManagementController.web.tsx      | 94.28   | 100      | 100     | 94.28   | 92-96             |
| assets.tsx                            | 100     | 100      | 100     | 100     |                   |
| config.js                             | 100     | 100      | 100     | 100     |                   |
| constants.ts                          | 100     | 100      | 100     | 100     |                   |
| types.ts                              | 100     | 100      | 100     | 100     |                   |
| src/GoalCreate                        | 97.24   | 87.2     | 92.15   | 97.23   |                   |
| GoalCreate.tsx                        | 94.73   | 87.5     | 83.33   | 94.73   | 162               |
| GoalCreate.web.tsx                    | 96.55   | 88.46    | 85.71   | 96.55   | 223               |
| GoalCreateController.tsx              | 97.43   | 80       | 93.75   | 97.43   | 193,287           |
| GoalCreateController.web.tsx          | 97.82   | 93.75    | 95.45   | 97.8    | 150,417           |
| src/GoalDetail                        | 97.91   | 88.88    | 94.28   | 97.88   |                   |
| GoalDetail.tsx                        | 100     | 100      | 100     | 100     |                   |
| GoalDetail.web.tsx                    | 100     | 100      | 100     | 100     |                   |
| GoalDetailController.tsx              | 97.67   | 87.5     | 91.66   | 97.61   | 118               |
| GoalDetailController.web.tsx          | 96.49   | 88.88    | 94.11   | 96.42   | 137,232           |
| src/GoalRetrieve                      | 94.66   | 100      | 85.07   | 95.39   |                   |
| GoalRetrieve.tsx                      | 93.75   | 100      | 80      | 93.75   | 142               |
| GoalRetrieve.web.tsx                  | 100     | 100      | 100     | 100     |                   |
| GoalRetrieveController.tsx            | 95.55   | 100      | 89.65   | 96.51   | 160,304-307       |
| GoalRetrieveController.web.tsx        | 92.47   | 100      | 80      | 93.25   | 296-299,323-337   |
| src/components/AlertDialog            | 100     | 100      | 100     | 100     |                   |
| AlertDialog.web.tsx                   | 100     | 100      | 100     | 100     |                   |
| src/components/BackIcon               | 100     | 100      | 100     | 100     |                   |
| BackIcon.web.tsx                      | 100     | 100      | 100     | 100     |                   |
| src/components/CalendarInputComponent | 100     | 100      | 100     | 100     |                   |
| CalendarInputComponent.tsx            | 100     | 100      | 100     | 100     |                   |
| CalendarInputComponentController.ts   | 100     | 100      | 100     | 100     |                   |
| CalendarObject.tsx                    | 100     | 100      | 100     | 100     |                   |
| src/components/ConfirmModal           | 100     | 100      | 100     | 100     |                   |
| ConfirmModal.tsx                      | 100     | 100      | 100     | 100     |                   |
| ConfirmModal.web.tsx                  | 100     | 100      | 100     | 100     |                   |
| ConfirmModalController.ts             | 100     | 100      | 100     | 100     |                   |
| src/components/DropdownComponent      | 100     | 100      | 100     | 100     |                   |
| DropdownComponent.tsx                 | 100     | 100      | 100     | 100     |                   |
| src/components/GoalItemList           | 100     | 100      | 100     | 100     |                   |
| GoalItemList.tsx                      | 100     | 100      | 100     | 100     |                   |
| GoalItemList.web.tsx                  | 100     | 100      | 100     | 100     |                   |
| GoalItemListController.ts             | 100     | 100      | 100     | 100     |                   |
| GoalItemListController.web.ts         | 100     | 100      | 100     | 100     |                   |
| src/components/HeaderComponent        | 100     | 100      | 100     | 100     |                   |
| HeaderComponent.tsx                   | 100     | 100      | 100     | 100     |                   |
| src/components/InputComponent         | 100     | 100      | 100     | 100     |                   |
| InputComponent.tsx                    | 100     | 100      | 100     | 100     |                   |
| InputComponent.web.tsx                | 100     | 100      | 100     | 100     |                   |

## CI/CD Details
- CI/CD runs fine with all the pipelines
- All the Pipelines pass through all the processes

## Versioning
- Version 0.0.1

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).
