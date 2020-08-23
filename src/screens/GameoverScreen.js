import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const GameoverScreen = ({ guessedRounds, userNumber, handleNewGame }) => {
  return (
    <View style={styles.screen}>
      <Text>Gameover</Text>
      <Text>Number of rounds: {guessedRounds}</Text>
      <Text>Number was: {userNumber}</Text>
      <Button title="New Game" onPress={handleNewGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GameoverScreen;
