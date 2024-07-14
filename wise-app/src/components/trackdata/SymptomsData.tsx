import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useState, useEffect } from "react";
import CustomText from "../custom-widgets/CustomText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "@/src/constants/colors";

const data = [
  { label: "All Good", index: "1" },
  { label: "Headache", index: "2" },
  { label: "Acne", index: "3" },
  { label: "Cramp", index: "4" },
  { label: "Fatigue", index: "5" },
  { label: "Back Pain", index: "6" },
  { label: "Breasts Pain", index: "7" },
];

// Map indices to image paths
const symptomsImageMap: any = {
  "1": require("../../../assets/images/illustrations/period-tracker/symptoms/symptom1.png"),
  "2": require("../../../assets/images/illustrations/period-tracker/symptoms/symptom2.png"),
  "3": require("../../../assets/images/illustrations/period-tracker/symptoms/symptom3.png"),
  "4": require("../../../assets/images/illustrations/period-tracker/symptoms/symptom4.png"),
  "5": require("../../../assets/images/illustrations/period-tracker/symptoms/symptom5.png"),
  "6": require("../../../assets/images/illustrations/period-tracker/symptoms/symptom6.png"),
  "7": require("../../../assets/images/illustrations/period-tracker/symptoms/symptom7.png"),
};

interface SymptomProps {
  selectedDay: string;
}

const SymptomsData: FC<SymptomProps> = ({ selectedDay }) => {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const day = selectedDay.replace(/\s+/g, "");
      const storedFeelings = await AsyncStorage.getItem(`${day}-symptoms`);
      if (storedFeelings) {
        setSelected(storedFeelings.split(","));
      } else {
        setSelected([]);
      }
    };

    fetchData();
  }, [selectedDay]);

  const handleSelected = (value: string) => {
    setSelected((prev) => {
      if (!prev.includes(value)) {
        return [...prev, value];
      } else {
        return prev.filter((label) => label !== value);
      }
    });
  };

  useEffect(() => {
    const storeData = async () => {
      const day = selectedDay.replace(/\s+/g, "");
      const stringSelected = selected.join(",");
      await AsyncStorage.setItem(`${day}-symptoms`, stringSelected);
    };

    storeData();
  }, [selected, selectedDay]);

  return (
    <View style={{ padding: "2%" }}>
      <CustomText
        label="Symptoms"
        customStyle={{ fontSize: 19, fontFamily: "DMSansBold" }}
      />

      <View style={styles.symptomsContainer}>
        <ScrollView
          horizontal={true}
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
        >
          {data.map((value, ind) => {
            return (
              <TouchableOpacity
                key={ind}
                onPress={() => handleSelected(value.label)}
              >
                <View
                  style={[
                    styles.symptoms,
                    {
                      backgroundColor: selected.includes(value.label)
                        ? COLORS.lightPrimary
                        : "transparent",
                      marginLeft: ind === 0 ? -10 : 10,
                      marginRight: ind == 6 ? 0 : 10,
                    },
                  ]}
                >
                  <Image
                    style={styles.image}
                    source={symptomsImageMap[value.index]}
                  />
                </View>
                <CustomText
                  label={value.label}
                  customStyle={[
                    styles.label,
                    {
                      marginLeft: ind === 0 ? -10 : 10,
                      marginRight: ind == 6 ? 0 : 10,
                    },
                  ]}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default SymptomsData;

const styles = StyleSheet.create({
  symptomsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  scrollContent: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  symptoms: {
    borderRadius: 150,
    height: 60,
    width: 60,
    borderWidth: 2,
    borderColor: COLORS.lightPrimary,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 70,
    width: 70,
  },
  label: {
    fontSize: 10,
    textAlign: "center",
    lineHeight: 19,
    marginTop: 5,
  },
});
