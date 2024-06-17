import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "@/src/constants/colors";
const CustomButton = ({
  label,
  onPress,
  customStyle,
  customTextStyle,
  icon,
}: any) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, customStyle]}>
      {icon && icon}
      <Text style={[styles.buttonText, customTextStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    gap: 5,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    justifyContent: "center",
    padding: 18,
    borderRadius: 10,
    marginBottom: 10,
    width: "90%",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
    color: COLORS.white,
  },
});
