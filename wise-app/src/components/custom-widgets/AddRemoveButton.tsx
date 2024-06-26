import React, { useRef } from "react";
import { View, TouchableOpacity, Text, Animated } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const startShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <TouchableOpacity
      style={{ alignItems: "center", padding: 5 }}
      onPress={() => {
        operation == "add"
          ? setValue(value + amount)
          : value - amount < 0
          ? setValue(0)
          : setValue(value - amount);
        startShake();
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
        <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
          <MaterialCommunityIcons
            name="bottle-soda"
            size={24}
            color={operation == "add" ? COLORS.primary : "red"}
          />
        </Animated.View>
      </View>
      <Text style={{ color: "#5a595b", fontWeight: "600" }}>{amount} mL</Text>
    </TouchableOpacity>
  );
};
