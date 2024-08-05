import CustomButton from "@/src/components/custom-widgets/CustomButton";
import CustomText from "@/src/components/custom-widgets/CustomText";
import { CALANDER_THEME, COLORS } from "@/src/constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { Switch } from "@rneui/themed";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import * as Notifications from "expo-notifications";
import Toast from "react-native-root-toast";
import { useAuth } from "@/src/context/authContext";

const App = () => {
  const [selected, setSelected] = useState<string>("");
  const { user } = useAuth();
  const [checkedReminder, setCheckedReminder] = useState<boolean>(false);
  const params = useLocalSearchParams();

  // Removing passed dates from localstorage
  const removePeriodLogs = async (previousPeriodDayMonths: string) => {
    const periodMonthsArray: string[] = previousPeriodDayMonths.split(",");
    const keysToRemove = periodMonthsArray.map((periodDay) =>
      periodDay.replace(/\s+/g, "")
    );
    for (const key of keysToRemove) {
      await AsyncStorage.removeItem(`${user?.userId}-${key}-flow`);
      await AsyncStorage.removeItem(`${user?.userId}-${key}-feelings`);
      await AsyncStorage.removeItem(`${user?.userId}-${key}-symptoms`);
    }
  };

  async function setPeriodReminder() {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        Toast.show("Permission to send notifications was denied");
        return;
      }
      const startDate = new Date(selected);
      const nextPeriodDate = new Date(startDate);
      nextPeriodDate.setDate(
        startDate.getDate() + parseInt(params?.cycleLength as string)
      );
      const day = nextPeriodDate.getUTCDate();
      const month = nextPeriodDate.getUTCMonth();
      const year = nextPeriodDate.getUTCFullYear();

      const targetDate = new Date(year, month, day, 9, 30, 0); // Assuming period starts tomorrow (August 5th)
      console.log(targetDate.getMonth());

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Period Reminder",
          sound: "default",
          subtitle: "Your period will start tomorrow!",
        },
        trigger: {
          date: targetDate,
        },
      });

      console.log("Notification scheduled with ID:", notificationId);
      await AsyncStorage.setItem(
        `${user.userId}-periodNotificationId`,
        notificationId
      );
      Toast.show("Period reminder has been set");
    } catch (error) {
      console.error("Error setting period reminder:", error);
      Toast.show("Failed to set period reminder");
    }
  }

  const handleInfoThree = async () => {
    if (selected === "") {
      Alert.alert("Please select your last period date");
      return;
    }

    if (checkedReminder) {
      await setPeriodReminder();
    }

    await Promise.all([
      AsyncStorage.setItem(
        `${user?.userId}-cycleLength`,
        params?.cycleLength as string
      ),
      AsyncStorage.setItem(
        `${user?.userId}-periodLength`,
        params?.periodLength as string
      ),
      AsyncStorage.setItem(`${user?.userId}-lastPeriod`, selected),
    ]);

    if (params?.prevPeriodData) {
      //@ts-ignore
      const prevPeriodData = JSON.parse(params?.prevPeriodData);
      const allPeriodDataString = await AsyncStorage.getItem(
        `${user?.userId}-allPeriodsData`
      );
      const tempArray = [prevPeriodData];

      if (allPeriodDataString && allPeriodDataString.length > 0) {
        let allPeriodDataArr = JSON.parse(allPeriodDataString);
        allPeriodDataArr = [...allPeriodDataArr, prevPeriodData];
        await AsyncStorage.setItem(
          `${user.userId}-allPeriodsData`,
          JSON.stringify(allPeriodDataArr)
        );
      } else {
        await AsyncStorage.setItem(
          `${user.userId}-allPeriodsData`,
          JSON.stringify(tempArray)
        );
      }
    }

    if (params.previousPeriodDayMonths) {
      await removePeriodLogs(params.previousPeriodDayMonths as string);
    }

    router.push("/period-tracker");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Icon name="arrow-back-outline" style={styles.backIcon} />
      </TouchableOpacity>
      <View>
        <CustomText
          label="When did your last period start?"
          customStyle={styles.text}
        />
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={(day: any) => {
              console.log(day.dateString);
              setSelected(day.dateString);
            }}
            style={styles.calendar}
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: true,
              },
            }}
            theme={CALANDER_THEME}
          />
        </View>
        <View style={styles.reminderContainer}>
          <Switch
            style={styles.switch}
            value={checkedReminder}
            color={COLORS.primary}
            onValueChange={(value) => setCheckedReminder(value)}
          />
          <CustomText
            label="Send me reminder 1 day before period"
            customStyle={styles.reminderText}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            label="Finish"
            customStyle={styles.button}
            onPress={handleInfoThree}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 10,
  },
  backIcon: {
    fontSize: 30,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 15,
  },
  calendarContainer: {
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 5,
    marginHorizontal: "2%",
  },
  calendar: {
    borderRadius: 5,
  },
  reminderContainer: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  switch: {
    marginLeft: -15,
  },
  reminderText: {
    fontSize: 15,
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 15,
    marginHorizontal: "2%",
  },
  button: {
    width: "100%",
  },
});

export default App;
