import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import CustomText from "../custom-widgets/CustomText";
import { COLORS } from "@/src/constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
const data = [
  { label: "Low", index: "1" },
  { label: "Medium", index: "2" },
  { label: "Heavy", index: "3" },
  { label: "Severe", index: "4" },
  { label: "Spotting", index: "5" },
];

// Map indices to image paths
const periodsImageMap: any = {
  "1": require("../../../assets/images/illustrations/period-tracker/period-quantity/period1.png"),
  "2": require("../../../assets/images/illustrations/period-tracker/period-quantity/period2.png"),
  "3": require("../../../assets/images/illustrations/period-tracker/period-quantity/period3.png"),
  "4": require("../../../assets/images/illustrations/period-tracker/period-quantity/period4.png"),
  "5": require("../../../assets/images/illustrations/period-tracker/period-quantity/period5.png"),
};

interface PeriodDataProps {
  selectedDay: string;
}

const PeriodData: FC<PeriodDataProps> = ({ selectedDay }) => {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const getPeriodsData = async () => {
      const day = selectedDay.replace(/\s+/g, "");
      const value = await AsyncStorage.getItem(`${day}-flow`);
      setSelected(value || "");
    };
    getPeriodsData();
  }, [selectedDay]);

  const handleSelected = async (value: string) => {
    const day = selectedDay.replace(/\s+/g, "");
    await AsyncStorage.setItem(`${day}-flow`, value);
    setSelected(value);
  };
  return (
    <View style={{ padding: "2%" }}>
      <CustomText
        label="Menstruation Flow"
        customStyle={{ fontSize: 19, fontFamily: "DMSansBold" }}
      />

      <View style={styles.periodContainer}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.scrollContent}
        >
          {data.map((value, ind) => {
            return (
              <TouchableOpacity
                onPress={() => handleSelected(value.label)}
                key={ind}
              >
                <View
                  style={[
                    styles.period,
                    {
                      backgroundColor:
                        selected === value.label ? "#FBE4E4" : "transparent",
                      marginLeft: ind === 0 ? -10 : 10,
                      marginRight: ind == 4 ? 0 : 10,
                    },
                  ]}
                >
                  <Image
                    style={{ height: 50, width: 50 }}
                    source={periodsImageMap[value.index]}
                  />
                </View>
                <CustomText
                  label={value.label}
                  customStyle={{
                    fontSize: 10,
                    textAlign: "center",
                    lineHeight: 19,
                    marginLeft: ind === 0 ? -10 : 10,
                    marginRight: ind == 4 ? 0 : 10,
                  }}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default PeriodData;

const styles = StyleSheet.create({
  periodContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  period: {
    borderRadius: 150,
    height: 60,
    width: 60,
    borderWidth: 2,
    borderColor: "#FBE4E4",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
