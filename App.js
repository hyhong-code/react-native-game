import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Header from "./src/components/Header";
import StartGameScreen from "./src/screens/StartGameScreen";
import GameScreen from "./src/screens/GameScreen";
import GameoverScreen from "./src/screens/GameoverScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessedRounds, setGuessedRounds] = useState(0);

  const handleStartGame = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessedRounds(0);
  };

  const handleGameover = (numOfRounds) => {
    setGuessedRounds(numOfRounds);
  };

  const handleNewGame = () => {
    setGuessedRounds(0);
    setUserNumber(0);
  };

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {!userNumber ? (
        <StartGameScreen handleStartGame={handleStartGame} />
      ) : !!userNumber && guessedRounds <= 0 ? (
        <GameScreen userChoice={userNumber} handleGameover={handleGameover} />
      ) : (
        <GameoverScreen
          handleNewGame={handleNewGame}
          guessedRounds={guessedRounds}
          userNumber={userNumber}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
