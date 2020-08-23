import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";
import Colors from "../constants/colors";

const StartGameScreen = () => {
  return (
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
        />
        <View style={styles.actions}>
          <View style={styles.button}>
            <Button title="Reset" color={Colors.secondary} onPress={() => {}} />
          </View>
          <View style={styles.button}>
            <Button title="Confirm" color={Colors.primary} onPress={() => {}} />
          </View>
        </View>
      </Card>
    </View>
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
});

export default StartGameScreen;
