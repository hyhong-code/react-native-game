import React from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = ({ style, ...restProps }) => {
  return <TextInput {...restProps} style={{ ...styles.input, ...style }} />;
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

export default Input;
