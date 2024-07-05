import { ActivityIndicator, StyleSheet, View } from "react-native";
import React from "react";
import { COLORS } from "@/src/constants/colors";

const Loading = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={"large"} color={COLORS.primary} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
