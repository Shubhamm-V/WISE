import React, { useRef } from "react";
import { View, TouchableOpacity, Text, Animated } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { COLORS } from "@/src/constants/colors";
import CustomText from "./CustomText";

interface Water {
  amount: number;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  operation: string;
}
export const AddRemoveButton = ({
  amount,
  value,
  setValue,
  operation = "add",
}: Water) => {
  // Shake Animation

  return (
    <TouchableOpacity
      style={{ alignItems: "center", padding: 5 }}
      onPress={() => {
        operation == "add"
          ? setValue(value + amount)
          : value - amount < 0
          ? setValue(0)
          : setValue(value - amount);
      }}
    >
      <View
        style={{
          borderWidth: 1,
          borderColor: operation == "add" ? COLORS.primary : "#FE5B7D",
          width: 48,
          height: 45,
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon
          name="glass-water"
          size={18}
          color={operation == "add" ? COLORS.primary : "#FE5B7D"}
        />
      </View>
      <CustomText
        label={`${amount} mL`}
        customStyle={{
          fontSize: 11,
          textAlign: "center",
          color: operation == "add" ? COLORS.primary : "#FE5B7D",
          paddingVertical: 2,
        }}
      />
    </TouchableOpacity>
  );
};
