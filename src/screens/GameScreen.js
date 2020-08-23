import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  ScrollView,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import theme from "../constants/theme";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import BodyText from "../components/BodyText";

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

const renderListItems = (value, idx, numRounds) => (
  <View key={`${value}-${idx}`} style={styles.listItem}>
    <BodyText>#{numRounds}</BodyText>
    <BodyText>{value}</BodyText>
  </View>
);

const GameScreen = ({ userChoice, handleGameover }) => {
  const initialGuess = genRandomBetween(1, 100, userChoice); // Runs every render, but state only uses it once on init
  const [curGuess, setCurGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);

  // Use useRef hook when no re-render is needed upon value change
  const minRef = useRef(1);
  const maxRef = useRef(100);

  useEffect(() => {
    if (curGuess === userChoice) {
      handleGameover(pastGuesses.length);
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

    setCurGuess(newNum);
    setPastGuesses((prev) => [newNum, ...prev]);
  };

  return (
    <View style={styles.screen}>
      <Text style={theme.title}>Opponent's Guess</Text>
      <NumberContainer>{curGuess}</NumberContainer>
      <Card style={styles.actions}>
        <MainButton onPress={handleNextGuess.bind(this, "LOWER")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={handleNextGuess.bind(this, "GREATER")}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, idx) =>
            renderListItems(guess, idx, pastGuesses.length - idx)
          )}
        </ScrollView> */}
        <FlatList
          contentContainerStyle={styles.list}
          data={pastGuesses}
          keyExtractor={(guess, idx) => `${guess}-${idx}`}
          renderItem={({ item, index }) =>
            renderListItems(item, index, pastGuesses.length - index)
          }
        />
      </View>
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
    width: 400,
    maxWidth: "90%",
  },
  listContainer: {
    width: "60%",
    flex: 1, // Must have to to scroll on Android
  },
  list: {
    justifyContent: "flex-end",
    flexGrow: 1, // More flexible 'flex: 1'
  },
  listItem: {
    borderColor: "#ccc",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default GameScreen;
