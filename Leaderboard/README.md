## Building Blocks React Native Mobile -  Leaderboard

Building Blocks - React Native Master App - Leaderboard

## Getting Started
N/A

### Prerequisites
- The feature of this block is a points leaderboard that shows where I am positioned versus other users of the app, so that I can see how I am performing relative to others. I expect to see user information including: username, profile image, total points, and 'member since' to show how long they have been using the app for.
- TrackerId: `872897`

### Git Structure
- `Leaderboard` branch is based on the `mater` branch

### Installing
- No additional dependencies
- Run `yarn` in `src` folder and `src/packages/mobile` folder 

## Running the tests
- Run `yarn` to install specific libraries used in **Leaderboard** block
- Then run `yarn test` to run the test with the block
- Unit test coverage result:

| File                          | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s |
|-------------------------------|---------|----------|---------|---------|-------------------|
| All files                     | 98.52   | 96.66    | 93.33   | 98.98   |                   |
| assets                        | 100     | 100      | 100     | 100     |                   |
| defaultImage.png              | 100     | 100      | 100     | 100     |                   |
| src                           | 98.51   | 96.66    | 93.33   | 98.98   |                   |
| Leaderboard.tsx               | 100     | 100      | 100     | 100     |                   |
| Leaderboard.web.tsx           | 100     | 88.88    | 100     | 100     | 65,95             |
| LeaderboardController.tsx     | 97.4    | 100      | 90      | 98.64   | 140               |
| LeaderboardController.web.tsx | 98.63   | 100      | 94.44   | 98.59   | 143               |
| assets.tsx                    | 100     | 100      | 100     | 100     |                   |
| config.js                     | 100     | 100      | 100     | 100     |                   |

## CI/CD Details
- CI/CD runs fine with all the pipelines
- All the Pipelines pass through all the processes

## Versioning
- Tag 0.0.1

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).
