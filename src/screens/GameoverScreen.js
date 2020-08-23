import React from "react";
import { View, StyleSheet, Button, Image, Text } from "react-native";

import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";
import TitleText from "../components/TitleText";
import Colors from "../constants/colors";

const GameoverScreen = ({ guessedRounds, userNumber, handleNewGame }) => {
  return (
    <View style={styles.screen}>
      <TitleText>Gameover</TitleText>
      <View style={styles.imgContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/success.png")}
          resizeMode="cover"
        />
        {/* <Image
          fadeDuration={300}
          source={{
            uri:
              "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80",
          }}
          style={styles.image}
        /> */}
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          Your phone needed{" "}
          <Text style={styles.highlight}>{guessedRounds}</Text> number of rounds
          to guess your number.
        </BodyText>
      </View>
      <MainButton onPress={handleNewGame}>New Game</MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imgContainer: {
    borderRadius: 250,
    borderWidth: 3,
    borderColor: "#000",
    width: 300,
    height: 300,
    overflow: "hidden",
    marginVertical: 30,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  resultContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: "open-sans-bold",
  },
  resultText: {
    textAlign: "center",
    fontSize: 20,
  },
});

export default GameoverScreen;
