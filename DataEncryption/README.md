## Building Blocks React Native Mobile -  DataEncryption

Building Blocks - React Native Master App - DataEncryption

## Getting Started

This building block code is under `src/packages/blocks/DataEncryption` directory.

### Prerequisites

- Tracker ID : `872981`
- Data will be encrypted and decrypted using this feature block, and it accepts data in the formats of string, file, and folder.
- To encrypt or decrypt a folder, users have to upload it as a zip file.
- After encrypting or decrypting the data, the appropriate output files are downloaded and stored in the same location they were uploaded from.
- For uploading files in iOS, a user is prompted with the options for saving files; in that case, the user has to choose "Save to files" in order to save it in the Files app.
- The user has to select only encrypted files for decryption.

### Git Structure

- `feature/872981-DataEncryption` branch is based on `master` branch

### Installing

Additional dependencies : 
- [react-native-fs](https://www.npmjs.com/package/react-native-fs)
- [react-native-document-picker](https://www.npmjs.com/package/react-native-document-picker)  
- [rn-fetch-blob](https://www.npmjs.com/package/react-native-modal)

Run `yarn` in `src` and `src/packages/mobile` directory.

## Running the tests

To run tests, run the following command

```bash
  cd src/packages/blocks/DataEncryption
  npm yarn test
```

## CI/CD Details

- CI/CD runs fine with all the pipelines
- All the Pipelines pass through all the processes

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).