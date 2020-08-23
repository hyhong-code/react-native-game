import React from "react";
import {
  View,
  StyleSheet,
  Button,
  Image,
  Text,
  Dimensions,
  ScrollView,
  useWindowDimensions,
} from "react-native";

import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";
import TitleText from "../components/TitleText";
import Colors from "../constants/colors";

const GameoverScreen = ({ guessedRounds, userNumber, handleNewGame }) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>Gameover</TitleText>
        <View
          style={{
            ...styles.imgContainer,
            borderRadius: (useWindowDimensions().width * 0.7) / 2,
            width: useWindowDimensions().width * 0.7,
            height: useWindowDimensions().width * 0.7,
            marginVertical: useWindowDimensions().height / 30,
          }}
        >
          <Image
            style={styles.image}
            source={require("../../assets/success.png")}
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            ...styles.resultContainer,
            marginVertical: useWindowDimensions().height / 60,
          }}
        >
          <BodyText
            style={{
              ...styles.resultText,
              fontSize: useWindowDimensions().height < 400 ? 16 : 20,
            }}
          >
            Your phone needed{" "}
            <Text style={styles.highlight}>{guessedRounds}</Text> number of
            rounds to guess your number.
          </BodyText>
        </View>
        <MainButton onPress={handleNewGame}>New Game</MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imgContainer: {
    borderWidth: 3,
    borderColor: "#000",
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  resultContainer: {
    marginHorizontal: 30,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: "open-sans-bold",
  },
  resultText: {
    textAlign: "center",
  },
});

export default GameoverScreen;
