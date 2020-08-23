import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import Header from "./src/components/Header";
import StartGameScreen from "./src/screens/StartGameScreen";
import GameScreen from "./src/screens/GameScreen";
import GameoverScreen from "./src/screens/GameoverScreen";

const fetchFonts = async () => {
  await Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessedRounds, setGuessedRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    // AppLoading is expo component designed for loading data
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

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
    <SafeAreaView style={styles.screen}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
