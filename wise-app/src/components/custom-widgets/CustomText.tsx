import { StyleSheet, Text, View } from "react-native";
import React from "react";

type TextType = {
  label: string;
  customStyle?: any;
};

const CustomText = ({ label, customStyle }: TextType) => {
  return (
    <Text
      style={[
        {
          fontFamily: "DMSansMedium",
        },
        customStyle,
      ]}
    >
      {label}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({});
