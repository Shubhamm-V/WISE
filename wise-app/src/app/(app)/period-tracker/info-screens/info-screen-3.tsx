import CustomButton from "@/src/components/custom-widgets/CustomButton";
import CustomText from "@/src/components/custom-widgets/CustomText";
import { COLORS } from "@/src/constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CheckBox } from "@rneui/themed";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { Switch } from "@rneui/themed";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import * as Notifications from "expo-notifications";
const App = () => {
  const [selected, setSelected] = useState<string>("");
  const [checkedReminder, setCheckedReminder] = useState<boolean>(false);
  const [periodBeforeDay, setPeriodBeforeDay] = useState<string>("");
  const params = useLocalSearchParams();
  // Removing passed dates from localstorage
  const removePeriodLogs = async (previousPeriodDayMonths: string) => {
    const periodMonthsArray: string[] = previousPeriodDayMonths.split(",");
    const keysToRemove = periodMonthsArray.map((periodDay: any) => {
      return periodDay.replace(/\s+/g, "");
    });
    for (const key of keysToRemove) {
      await AsyncStorage.removeItem(`${key}-flow`);
      await AsyncStorage.removeItem(`${key}-feelings`);
      await AsyncStorage.removeItem(`${key}-symptoms`);
    }
  };

  const schedulePeriodsReminder = async () => {
    // const startDate = new Date(selected);
    // const periodBeforeDay = new Date(startDate);
    // calculating next period date
    // periodBeforeDay.setDate(startDate.getDate() + parseInt(cycleLength));
    // const [year, month, day] = periodBeforeDay.split('-').map(Number);
    const permission = await Notifications.requestPermissionsAsync();
    if (permission.status === "granted") {
      const notificationDate = new Date(2024, 6, 12, 10, 30); // Example date: July 12, 2024, 10:30 AM

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Period Starting Tommrow",
          subtitle: "Your body needs water!",
        },
        trigger: {
          date: notificationDate,
        },
      });
      await AsyncStorage.setItem("periodNotificationId", notificationId);
      console.log("Notification scheduled with ID:", notificationId);
    }
  };

  const handleInfoThree = async () => {
    if (selected === "") {
      Alert.alert("Please select your last period date");
      return;
    }
    await AsyncStorage.setItem("lastPeriod", selected);

    if (params?.prevPeriodData) {
      // @ts-ignore
      const prevPeriodData = JSON.parse(params?.prevPeriodData);
      const allPeriodDataString = await AsyncStorage.getItem("allPeriodsData");
      // @ts-ignore
      const tempArray = [];
      tempArray.push(prevPeriodData);

      if (allPeriodDataString && allPeriodDataString.length > 0) {
        let allPeriodDataArr = JSON.parse(allPeriodDataString);
        allPeriodDataArr = [...allPeriodDataArr, prevPeriodData];
        await AsyncStorage.setItem(
          "allPeriodsData",
          JSON.stringify(allPeriodDataArr)
        );
      } else {
        await AsyncStorage.setItem("allPeriodsData", JSON.stringify(tempArray));
      }
    }

    if (params.previousPeriodDayMonths)
      await removePeriodLogs(params.previousPeriodDayMonths as string);
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
          customStyle={{
            fontSize: 20,
            textAlign: "center",
            marginVertical: 15,
          }}
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
        <View style={styles.reminderContainer}>
          <Switch
            style={{ marginLeft: -15 }}
            value={checkedReminder}
            color={COLORS.primary}
            onValueChange={(value) => setCheckedReminder(value)}
          />
          <CustomText
            label="Send me reminder 1 day before period"
            customStyle={{ fontSize: 15 }}
          />
        </View>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 15,
            marginHorizontal: "2%",
          }}
        >
          <CustomButton
            label="Finish"
            customStyle={{ width: "100%" }}
            onPress={handleInfoThree}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  reminderContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
