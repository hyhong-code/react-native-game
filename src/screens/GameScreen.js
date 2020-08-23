import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Text, Button, Alert } from "react-native";

import theme from "../constants/theme";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

const genRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rand = Math.floor(Math.random() * (max - min)) + min;

  if (rand === exclude) {
    return genRandomBetween(min, max, exclude);
  } else {
    return rand;
  }
};

const GameScreen = ({ userChoice, handleGameover }) => {
  const [curGuess, setCurGuess] = useState(
    genRandomBetween(1, 100, userChoice)
  );
  const [numRounds, setNumRounds] = useState(1);

  // Use useRef hook when no re-render is needed upon value change
  const minRef = useRef(1);
  const maxRef = useRef(100);

  useEffect(() => {
    if (curGuess === userChoice) {
      handleGameover(numRounds);
    }
  }, [curGuess, userChoice, handleGameover]);

  const handleNextGuess = (direction) => {
    // Handle user gives wrong hints
    if (
      (direction === "LOWER" && curGuess < userChoice) ||
      (direction === "GREATER" && curGuess > userChoice)
    ) {
      return Alert.alert("Dont't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "Cancel" },
      ]);
    }

    let newNum;
    if (direction === "LOWER") {
      maxRef.current = curGuess; // Update new max
      newNum = genRandomBetween(minRef.current, curGuess, curGuess);
    }

    if (direction === "GREATER") {
      minRef.current = curGuess; // Update new min
      newNum = genRandomBetween(maxRef.current, curGuess, curGuess);
    }

    setNumRounds((prev) => prev + 1);
    return setCurGuess(newNum);
  };

  return (
    <View style={styles.screen}>
      <Text style={theme.title}>Opponent's Guess</Text>
      <NumberContainer>{curGuess}</NumberContainer>
      <Card style={styles.actions}>
        <Button title="LOWER" onPress={handleNextGuess.bind(this, "LOWER")} />
        <Button
          title="GREATER"
          onPress={handleNextGuess.bind(this, "GREATER")}
        />
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
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});

export default GameScreen;
