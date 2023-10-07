import React from "react";
// Customizable Area Start
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import styles from "./DataEncryption.Styles";
// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import DataEncryptionController, {
  configJSON,
  Props,
} from "./DataEncryptionController";

export default class DataEncryption extends DataEncryptionController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback
          testID={"touchableWithoutFeedback"}
          onPress={() => {
            this.hideKeyboard();
          }}>
          <View>
            <View style={styles.viewBlock}>
              <View style={styles.viewTextInput}>
                <TextInput
                  testID={"encryptionString"}
                  placeholder="Enter string to encrypt"
                  value={this.state.encryptStringInput}
                  onChangeText={(encryptString) =>
                    this.setEncryptionString(encryptString)
                  }
                  style={styles.fontSize16}
                />
              </View>
              <TouchableOpacity
                testID={"btnEncryptString"}
                style={styles.touchableButton}
                onPress={() => [
                  this.hideKeyboard(),
                  this.encryptString(this.state.encryptStringInput),
                ]}>
                <Text style={styles.textButton}>
                  {configJSON.labelEncryptString}
                </Text>
              </TouchableOpacity>
              <View style={styles.viewTextInput}>
                <Text style={styles.fontSize16}>
                  {this.state.encryptStringOutput}
                </Text>
              </View>
            </View>

            <View style={styles.viewBlock}>
              <View style={styles.viewTextInput}>
                <TextInput
                  testID={"decryptionString"}
                  placeholder="Enter string to decrypt"
                  value={this.state.decryptStringInput}
                  onChangeText={(decryptString) =>
                    this.setDecryptionString(decryptString)
                  }
                  style={styles.fontSize16}
                />
              </View>
              <TouchableOpacity
                testID={"btnDecryptString"}
                style={styles.touchableButton}
                onPress={() =>
                  this.decryptString(this.state.decryptStringInput)
                }>
                <Text style={styles.textButton}>
                  {configJSON.labelDecryptString}
                </Text>
              </TouchableOpacity>
              <View style={styles.viewTextInput}>
                <Text style={styles.fontSize16}>
                  {this.state.decryptStringOutput}
                </Text>
              </View>
            </View>

            <View style={[styles.viewBlock]}>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  testID={"btnEncryptFile"}
                  style={[styles.touchableButton, { marginRight: 5 }]}
                  onPress={() => this.filePicker("encrypt")}>
                  <Text style={styles.textButton}>
                    {configJSON.labelEncryptFile}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  testID={"btnDecryptFile"}
                  style={[styles.touchableButton, { marginLeft: 5 }]}
                  onPress={() => this.filePicker("decrypt")}>
                  <Text style={styles.textButton}>
                    {configJSON.labelDecryptFile}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.viewBlock, { flexDirection: "row" }]}>
              <TouchableOpacity
                testID={"btnEncryptFolder"}
                style={[styles.touchableButton, { marginRight: 5 }]}
                onPress={() => this.folderPicker("encrypt")}>
                <Text style={styles.textButton}>
                  {configJSON.labelEncryptFolder}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID={"btnDecryptFolder"}
                style={[styles.touchableButton, { marginLeft: 5 }]}
                onPress={() => this.folderPicker("decrypt")}>
                <Text style={styles.textButton}>
                  {configJSON.labelDecryptFolder}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
// Customizable Area End
