## Building Blocks React Native Mobile - TimesheetManagement

Building Blocks - React Native Master App - TimesheetManagement

## AWS BACKEND DEPLOYMENT URL
 - BaseURL exported as: "https://b21ksharedservicesinr-294805-ruby.b294805.dev.eastus.az.svc.builder.cafe"

## Getting Started

This is a TimesheetManagement block where user can create and manage task with listing and details view.

### Prerequisites

What things you need to install the software and how to install them

- React Native (last tested on react-native0.61.3)

  - https://facebook.github.io/react-native/docs/getting-started

- IFF brew is installed and user doesn't have permisions.

```
  $ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall)"
  $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

- XCode 11 or greater

- XCode Command Line Tools

```
  $ xcode-select --install
```

- Android SDK

```
  $ brew cask install android-sdk
```

- JDK 11

```
  $ brew tap homebrew/cask-versions
  $ brew cask install java
  $ brew cask install java11
```

### Git Structure
It is on `master` branch.

### Installing

A step by step series of examples that tell you how to get a development env running

Install yarn

```
  $ brew install yarn
```

Install node

```
  $ brew install node
```

Web

```
  $ yarn
  $ yarn workspace web start
  (Note: After udpating depencies run again if no cocde erros. )
```

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

```
  $ yarn test OR $ yarn test -u
```

## CI/CD Details

We use GitlabCI for our deployment/Build pipelines

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).
