import React, { useRef } from "react";
import { View, TouchableOpacity, Text, Animated } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "@/src/constants/colors";

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
          borderColor: operation == "add" ? COLORS.primary : "red",
          width: 60,
          height: 60,
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon
          name="bottle-soda"
          size={24}
          color={operation == "add" ? COLORS.primary : "red"}
        />
      </View>
      <Text style={{ color: "#5a595b", fontWeight: "600" }}>{amount} mL</Text>
    </TouchableOpacity>
  );
};
