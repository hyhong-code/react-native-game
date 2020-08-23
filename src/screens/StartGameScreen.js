import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard, // RN API
  Alert, // RN API
} from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import Colors from "../constants/colors";

const StartGameScreen = () => {
  const [value, setValue] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedNum, setSelectedNum] = useState();

  const hanldeInput = (newVal) => {
    setValue(newVal.replace(/[^0-9]/g, "")); // Replace non number
  };

  const handleReset = () => {
    setValue("");
    setIsConfirmed(false);
  };

  const handleConfirm = () => {
    const chosenNum = parseInt(value);

    if (isNaN(chosenNum) || chosenNum <= 0 || chosenNum > 99) {
      Alert.alert(
        "Invalid number",
        "Number has to be a number between 1 and 99.",
        [{ text: "Okay", style: "destructive", onPress: handleReset }]
      );
      return;
    }

    // Following 3 setStates are all batched together
    // No particular order
    setIsConfirmed(true);
    setSelectedNum(chosenNum);
    setValue("");
    Keyboard.dismiss();
  };

  // Keyboard API, click outside dismiss keyboard
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a new game!</Text>
        <Card style={styles.form}>
          <Text>Select a number!</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad" // no decimal
            maxLength={2}
            value={value}
            onChangeText={hanldeInput}
          />
          <View style={styles.actions}>
            <View style={styles.button}>
              <Button
                title="Reset"
                color={Colors.secondary}
                onPress={handleReset}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                color={Colors.primary}
                onPress={handleConfirm}
              />
            </View>
          </View>
        </Card>
        {isConfirmed && !!selectedNum && (
          <Card style={styles.summary}>
            <Text>You selected:</Text>
            <NumberContainer>{selectedNum}</NumberContainer>
            <Button title="START GAME" />
          </Card>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  form: {
    alignItems: "center",
    width: 300,
    maxWidth: "80%", // If device too small, constraint to 80%
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    width: 100,
  },
  summary: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default StartGameScreen;
