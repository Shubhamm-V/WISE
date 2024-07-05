import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "@/src/constants/colors";
import CustomText from "./CustomText";
const CustomButton = ({
  label,
  onPress,
  customStyle,
  customTextStyle,
  isDisabled,
  icon,
}: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        customStyle,
        isDisabled && { borderColor: "lightgray" },
      ]}
      disabled={isDisabled}
    >
      {icon && icon}
      <CustomText
        label={label}
        customStyle={[
          { color: COLORS.white },
          customTextStyle,
          isDisabled && { color: "lightgray" },
        ]}
      />
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
  disabled: {
    borderColor: "gray",
  },
});
