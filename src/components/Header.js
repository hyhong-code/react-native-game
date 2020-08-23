import React from "react";
import { View, StyleSheet } from "react-native";

import Colors from "../constants/colors";
import TitleText from "../components/TitleText";

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <TitleText style={styles.headerTitle}>{title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 36, // For notch
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#000",
    fontSize: 18,
    fontFamily: "open-sans-bold",
  },
});

export default Header;
