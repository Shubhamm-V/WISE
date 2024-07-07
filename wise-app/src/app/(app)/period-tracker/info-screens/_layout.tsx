import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack
      initialRouteName="info-screen-1"
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default _layout;

const styles = StyleSheet.create({});
