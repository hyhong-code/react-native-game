import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard, // RN API
  Alert, // RN API
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  useWindowDimensions,
} from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import Colors from "../constants/colors";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

const StartGameScreen = ({ handleStartGame }) => {
  const [value, setValue] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedNum, setSelectedNum] = useState();

  const buttonWidth = useWindowDimensions().width / 4;

  // Listening to Orientation changes
  // const [buttonWidth, setButtonWidth] = useState(
  //   Dimensions.get("window").width / 4
  // );

  // useEffect(() => {
  //   const updateLayout = () => {
  //     setButtonWidth(Dimensions.get("window").width / 4);
  //   };

  //   Dimensions.addEventListener("change", updateLayout);

  //   return () => {
  //     Dimensions.removeEventListener("change", updateLayout);
  //   };
  // }, []);

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
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen}>
            <TitleText style={styles.title}>Start a new game!</TitleText>
            <Card style={styles.form}>
              <BodyText>Select a number!</BodyText>
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
                <View style={{ width: buttonWidth }}>
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
                <BodyText>You selected:</BodyText>
                <NumberContainer>{selectedNum}</NumberContainer>
                <MainButton onPress={() => handleStartGame(selectedNum)}>
                  START GAME
                </MainButton>
              </Card>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
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
    width: "80%",
    maxWidth: "95%",
    minWidth: 300,
    // maxWidth: "80%", // If device too small, constraint to 80%
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
  summary: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default StartGameScreen;
