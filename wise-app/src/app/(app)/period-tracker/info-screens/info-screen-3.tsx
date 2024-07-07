import CustomButton from "@/src/components/custom-widgets/CustomButton";
import CustomText from "@/src/components/custom-widgets/CustomText";
import { COLORS } from "@/src/constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

const App = () => {
  const [selected, setSelected] = useState("");

  const handleInfoThree = async () => {
    if (selected === "") {
      Alert.alert("Please select your last period date");
      return;
    }
    await AsyncStorage.setItem("lastPeriod", selected);
    router.push("/period-tracker");
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.light,
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        style={{ position: "absolute", top: 40, left: 10 }}
        onPress={() => router.back()}
      >
        <Icon
          name="arrow-back-outline"
          style={{
            fontSize: 30,
          }}
        />
      </TouchableOpacity>
      <View>
        <CustomText
          label="When did your last period start?"
          customStyle={{ fontSize: 20, textAlign: "center", marginBottom: 15 }}
        />
        <View
          style={{
            borderWidth: 1,
            borderColor: "lightgray",
            borderRadius: 5,
            marginHorizontal: "2%",
          }}
        >
          <Calendar
            onDayPress={(day: any) => {
              console.log(day.dateString);
              setSelected(day.dateString);
            }}
            style={{ borderRadius: 5 }}
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: true,
              },
            }}
            theme={{
              selectedDayBackgroundColor: COLORS.primary, // This also sets the selected day background color
              arrowColor: COLORS.primary,
              todayTextColor: COLORS.primary,
            }}
          />
        </View>
        <View style={{ display: "flex", alignItems: "center", marginTop: 25 }}>
          <CustomButton
            label="Finish"
            style={{ width: "100%" }}
            onPress={handleInfoThree}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
