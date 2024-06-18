import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
const Tab = createBottomTabNavigator();

type Props = {};

const index = (props: Props) => {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <ActivityIndicator size="large" color="gray" />
      <Tabs />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
