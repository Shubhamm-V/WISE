import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from "@react-native-community/slider";
import CustomText from "@/src/components/custom-widgets/CustomText";
import { COLORS } from "@/src/constants/colors";
import CustomButton from "@/src/components/custom-widgets/CustomButton";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const InfoScreen1 = () => {
  const [value, setValue] = useState(28);
  const params = useLocalSearchParams();
  const handleInfoOne = async () => {
    router.push({
      pathname: "/period-tracker/info-screens/info-screen-2",
      params: {
        previousPeriodDayMonths: params.periodDayMonths,
        prevPeriodData: params?.prevPeriodData,
        cycleLength: value.toString(),
      },
    });
  };
  return (
    <SafeAreaView
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: COLORS.light,
      }}
    >
      <View style={{ padding: "3%", alignItems: "center" }}>
        <Image
          style={styles.image}
          source={require("../../../../../assets/images/illustrations/period-tracker/info-screen/step-2.png")}
        />
        <CustomText
          label="How long is your menstrual cycle?"
          customStyle={{
            color: COLORS.primary,
            fontSize: 19,
            fontFamily: "DMSansBold",
            textAlign: "center",
          }}
        />
        <CustomText
          label="This is number of days between 2 cycles"
          customStyle={{ textAlign: "center", fontSize: 16, marginLeft: -10 }}
        />
      </View>
      <View style={{ width: "100%", alignItems: "center" }}>
        <CustomText label={value.toString()} customStyle={styles.label} />
        <Slider
          value={value}
          style={{ width: "60%", transform: [{ scale: 1.7 }] }}
          minimumValue={14}
          maximumValue={38}
          onValueChange={(value) => setValue(Math.floor(value))}
          thumbTintColor={COLORS.primary}
          minimumTrackTintColor={COLORS.primary}
          maximumTrackTintColor="#000000"
        />
      </View>
      <CustomButton
        label="Next"
        customStyle={{ marginVertical: 40 }}
        onPress={handleInfoOne}
      />
    </SafeAreaView>
  );
};

export default InfoScreen1;

const styles = StyleSheet.create({
  label: {
    fontSize: 40,
    fontFamily: "DMSansBold",
    color: COLORS.primary,
    marginVertical: 15,
    textAlign: "center",
  },
  image: {
    height: 250,
    margin: 10,
    width: 250,
  },
});
