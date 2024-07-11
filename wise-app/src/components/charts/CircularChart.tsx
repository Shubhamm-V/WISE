import { DonutChart } from "react-native-circular-chart";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "@/src/constants/colors";
import CustomText from "../custom-widgets/CustomText";

const CircularChart = () => {
  const [cycleDetails, setCycleDetails] = useState({});
  const { width, height } = useWindowDimensions();
  const padding = 18;

  useEffect(() => {
    const fetchCycleDetails = async () => {
      const cycleLength = await AsyncStorage.getItem("cycleLength");
      const periodLength = await AsyncStorage.getItem("periodLength");
      const lastPeriod = await AsyncStorage.getItem("lastPeriod");
      setCycleDetails({
        cycleLength: cycleLength ?? "",
        periodLength: periodLength ?? "",
        lastPeriod: lastPeriod ?? "",
      });
    };

    fetchCycleDetails();
  }, []);

  const DATA = [
    {
      name: "Period Days",
      value: 18,
      color: COLORS.primary,
    },
    {
      name: "Remaining",
      value: 7,
      color: "#E0F788",
    },
    {
      name: "Remaining",
      value: 4,
      color: "#E0F7FA",
    },
  ];
  return (
    <View style={{ margin: 10 }}>
      <CustomText label="Your Next Period" customStyle={styles.title} />
      <View style={styles.sectionWrapper}>
        <DonutChart
          data={DATA}
          strokeWidth={20}
          labelTitleStyle={{ textAlign: "center", fontFamily: "DMSansBold" }}
          radius={90}
          containerWidth={width - padding * 3}
          containerHeight={105 * 2}
          type="round"
          startAngle={0}
          endAngle={360}
          animationType="slide"
        />
        <View
          style={{
            width: "100%",
            padding: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <View style={styles.boxContainer}>
            <View style={styles.box}></View>
            <CustomText label="Days Remaining" />
          </View>
          <View style={styles.boxContainer}>
            <View style={[styles.box, { backgroundColor: "#E0F7FA" }]}></View>
            <CustomText label="Days Remaining" />
          </View>
          <View style={styles.boxContainer}>
            <View style={[styles.box, { backgroundColor: "#E0F788" }]}></View>
            <CustomText label="Days Remaining" />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionWrapper: {
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    borderRadius: 5,
    shadowRadius: 0.84,
    shadowOpacity: 0.15,
    shadowColor: "#52006A",
    marginTop: 10,
    paddingVertical: 20,
    backgroundColor: COLORS.light,
  },
  title: {
    color: COLORS.dark,
    fontFamily: "DMSansSemiBold",
    fontSize: 17,
  },
  box: {
    height: 20,
    width: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  boxContainer: {
    display: "flex",
    flexDirection: "row",
    width: "45%",
    gap: 10,
    marginTop: 5,
  },
});

export default CircularChart;
