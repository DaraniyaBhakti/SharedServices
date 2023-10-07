## Building Blocks React Native Mobile - BudgetingForecasting

## Getting Started

N/A

### Prerequisites

Building Blocks - React Native Master App - BudgetingForecasting
User can see the data to help forecast expenses, revenue and budget.
Screen should Includes a dashboard for organizing and viewing different metrics together in one place.
Also Total Revenue, Total Expense and Total Budget should be shown separately.
The screen also show details about Revenues and Expenses

### Git Structure

Budgeting Forecasting branch is based on the mater branch

### Installing

iOS

```
  $ yarn
  $ cd packages/mobile/ios && pod install && cd ../../../ && cp node-runners/RCTUIImageViewAnimated.m node_modules/react-native/Libraries/Image/RCTUIImageViewAnimated.m && npx react-native bundle --entry-file ./packages/mobile/index.js --platform ios --dev true --bundle-output ./packages/mobile/ios/main.jsbundle && yarn ios
```

Android - https://docs.expo.io/versions/latest/workflow/android-studio-emulator/

```
  $ yarn
  $ export JAVA_HOME=`/usr/libexec/java_home -v 11`; java -version; export ANDROID_HOME=${HOME}/Library/Android/sdk; export PATH=${PATH}:${ANDROID_HOME}/emulator && yarn android
```

## Running the tests

cd packages/blocks/BudgetingForecasting/

yarn test

------------------------------------|---------|----------|---------|---------|
File                                | % Stmts | % Branch | % Funcs | % Lines |                                
------------------------------------|---------|----------|---------|---------
All files                           |     100 |    82.46 |     100 |     100 |                                                 
 BudgetingForecasting.tsx           |     100 |    82.73 |     100 |     100 |
 BudgetingForecasting.web.tsx       |     100 |    81.71 |     100 |     100 | 
 BudgetingForecastingController.tsx |     100 |     90.9 |     100 |     100 |                                 
 config.js                          |     100 |      100 |     100 |                                                   
------------------------------------|---------|----------|---------|---------|

## CI/CD Details

- CI/CD runs fine with all the pipelines
- All the Pipelines pass through all the processes

## Versioning

Tag 0.0.1

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).
