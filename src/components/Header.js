import React from "react";
import { View, StyleSheet, Platform } from "react-native";

import Colors from "../constants/colors";
import TitleText from "../components/TitleText";

const Header = ({ title }) => {
  return (
    <View
      style={{
        ...styles.headerBase,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndriod,
        }),
      }}
    >
      <TitleText style={styles.headerTitle}>{title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBase: {
    width: "100%",
    height: 90,
    paddingTop: 36, // For notch
    alignItems: "center",
    justifyContent: "center",
  },
  headerIOS: {
    backgroundColor: "#fff",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  headerAndriod: {
    backgroundColor: Colors.primary,
    borderBottomColor: "transparent",
    borderBottomWidth: 0,
  },
  headerTitle: {
    color: "#000",
    fontSize: 18,
    fontFamily: "open-sans-bold",
    color: Platform.OS === "ios" ? Colors.primary : "#fff",
  },
});

export default Header;
