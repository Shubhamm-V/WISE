import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
type TextType = {
  label: string;
  customStyle?: any;
};

const CustomText = ({ label, customStyle }: TextType) => {
  return <Text>{label}</Text>;
};

export default CustomText;

const styles = StyleSheet.create({});
