import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "@/src/constants/colors";

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
          color: COLORS.dark,
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
