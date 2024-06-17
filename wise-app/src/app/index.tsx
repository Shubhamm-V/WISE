import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFonts } from "expo-font";

type Props = {};

const index = (props: Props) => {
  //   const [fontsLoaded, fontError] = useFonts({
  //     DMSans: require("./assets/fonts/Inter-Black.otf"),
  //   });
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      {/* <Text style={{ fontWeight: "bold", fontSize: 40, fontFamily: "DMSans" }}>
        Hello, My name is Shubham
      </Text> */}
      <ActivityIndicator size="large" color="gray" />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
