import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from "@react-native-community/slider";
import CustomText from "@/src/components/custom-widgets/CustomText";
import { COLORS } from "@/src/constants/colors";
import CustomButton from "@/src/components/custom-widgets/CustomButton";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const InfoScreen2 = () => {
  const [value, setValue] = useState(4);
  const params = useLocalSearchParams();
  const handleInfoTwo = async () => {
    router.push({
      pathname: "/period-tracker/info-screens/info-screen-3",
      params: {
        previousPeriodDayMonths: params.previousPeriodDayMonths,
        prevPeriodData: params?.prevPeriodData,
        cycleLength: params?.cycleLength,
        periodLength: value.toString(),
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.light }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Icon
          name="arrow-back-outline"
          style={{
            top: 10,
            left: 10,
            position: "absolute",
            fontSize: 30,
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <View style={{ padding: "3%", alignItems: "center" }}>
          <Image
            style={styles.image}
            source={require("../../../../../assets/images/illustrations/period-tracker/info-screen/step-1.png")}
          />
          <CustomText
            label="How long is your Period?"
            customStyle={{
              color: COLORS.primary,
              fontSize: 21,
              fontFamily: "DMSansBold",
              textAlign: "center",
            }}
          />
          <CustomText
            label="Bleeding usually lasts between 1-15 days"
            customStyle={{
              textAlign: "center",
              fontSize: 16,
              marginLeft: -10,
            }}
          />
        </View>
        <View style={{ width: "100%", alignItems: "center" }}>
          <CustomText label={value.toString()} customStyle={styles.label} />
          <Slider
            value={value}
            style={{ width: "60%", transform: [{ scale: 1.7 }] }}
            minimumValue={1}
            maximumValue={15}
            onValueChange={(value) => setValue(Math.floor(value))}
            thumbTintColor={COLORS.primary}
            minimumTrackTintColor={COLORS.primary}
            maximumTrackTintColor="#000000"
          />
        </View>
        <CustomButton
          label="Next"
          customStyle={{ marginVertical: 40 }}
          onPress={handleInfoTwo}
        />
      </View>
    </SafeAreaView>
  );
};

export default InfoScreen2;

const styles = StyleSheet.create({
  label: {
    fontSize: 40,
    fontFamily: "DMSansBold",
    color: COLORS.primary,
    marginVertical: 15,
    textAlign: "center",
  },
  image: {
    height: 280,
    width: 280,
  },
});
