import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { AddRemoveButton } from "@/src/components/custom-widgets/AddRemoveButton";
import CustomButton from "@/src/components/custom-widgets/CustomButton";
import { COLORS } from "@/src/constants/colors";
import CustomText from "@/src/components/custom-widgets/CustomText";
import Icon from "react-native-vector-icons/Ionicons";
import { CheckBox, Dialog } from "@rneui/themed";
import Toast from "react-native-root-toast";
import { Input } from "@rneui/themed";
const amounts = [250, 500, 1000, 1500];

// Async Storage
const storeData = async (value: any, key = "@amount") => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

const getData = async (key: any, setValue: any) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log(value);
      setValue(Number(value));
    }
  } catch (e) {
    // error reading value
    console.log(e);
  }
};

// Notifications

async function setWaterReminder(hours: number, doRepeat: boolean) {
  const permission = await Notifications.requestPermissionsAsync();
  const seconds = hours * 60;
  if (permission.status === "granted") {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "💧 Water Reminder",
        subtitle: "Your body needs water!",
      },
      trigger: {
        repeats: true,
        seconds, // Convert hours to seconds
      },
    });
    await AsyncStorage.setItem("waterNotificationId", notificationId);
    Toast.show("Water reminder has been set");
  } else {
    Toast.show("Permission to send notifications was denied");
  }
}

async function cancelWaterReminder() {
  try {
    const notificationId = await AsyncStorage.getItem("waterNotificationId");
    if (notificationId) {
      await Notifications.cancelScheduledNotificationAsync(notificationId);

      Toast.show(`Reminder has been cancelled`);
    } else {
      // console.log("No notification ID found.");
    }
  } catch (error) {
    console.error("Error cancelling notification:", error);
  }
}

async function checkScheduledNotifications() {
  const scheduledNotifications =
    await Notifications.getAllScheduledNotificationsAsync();
  return scheduledNotifications;
}

export default function App() {
  const [fillingPercentage, setFillingPercentage] = useState(0);
  const [waterGoal, setWaterGoal] = useState(3000);
  const [waterDrank, setWaterDrank] = useState(0);
  const [isGoalAchieved, setIsGoalAchieved] = useState(false);
  const [checkedRepeated, setCheckedRepeated] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [hours, setHours] = useState("");
  const [isNotificationScheduled, setIsNotificationScheduled] = useState(false);

  // Progress Bar Animation
  const barHeight = useRef(new Animated.Value(0)).current;
  const progressPercent = barHeight.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", `100%`],
  });

  useEffect(() => {
    getData("@amount", setWaterDrank);
    getData("@goal", setWaterGoal);

    const checkNotifications = async () => {
      const notifications = await checkScheduledNotifications();
      if (notifications.length > 0) {
        setIsNotificationScheduled(true);
      } else {
        setIsNotificationScheduled(false);
      }
    };

    checkNotifications();
  }, []);

  useEffect(() => {
    Animated.timing(barHeight, {
      duration: 1000,
      toValue: fillingPercentage / 3,
      useNativeDriver: false,
    }).start();
  }, [fillingPercentage]);

  useEffect(() => {
    storeData(waterGoal.toString(), "@goal");
  }, [waterGoal]);

  useEffect(() => {
    storeData(waterDrank.toString(), "@amount");
  }, [waterDrank]);

  useEffect(() => {
    // percentage = waterDrank * 100 / waterGoal
    let percentage = (waterDrank * 100) / waterGoal;
    let fillingP = (percentage * 300) / 100;
    setFillingPercentage(fillingP > 300 ? 300 : fillingP);
  }, [waterGoal, setFillingPercentage, waterDrank]);

  useEffect(() => {
    if (waterDrank >= waterGoal && isGoalAchieved === false) {
      setIsGoalAchieved(true);
      setTimeout(() => {
        Alert.alert("Your today's goal achieved 🎉");
      }, 1000);
    }
    if (waterDrank < waterGoal && isGoalAchieved === true) {
      setIsGoalAchieved(false);
    }

    // if (showGoalAchieved === false && isGoalAchieved === true) {
    //   setshowGoalAchieved(true);
    //   Toast.show("Your today's goal achieved 🎉");
    // } else {
    //   setshowGoalAchieved(false);
    // }
  }, [waterDrank, isGoalAchieved, waterGoal]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 20 }}
      >
        {/* Water Goal */}
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 30,
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <CustomText
            label="Your Goal"
            customStyle={{
              fontSize: 22,
              color: COLORS.primary,
              fontFamily: "DMSansBold",
            }}
          />

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CustomText
              label={`${waterGoal} mL`}
              customStyle={{ fontSize: 20 }}
            />

            {/* Add Goal */}
            <TouchableOpacity
              style={{ paddingHorizontal: 3 }}
              onPress={() => setWaterGoal(waterGoal + 250)}
            >
              <Ionicons
                name="add-circle-outline"
                size={30}
                color={COLORS.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingHorizontal: 1 }}
              onPress={() => setWaterGoal(waterGoal - 250)}
            >
              <Ionicons name="remove-circle" size={30} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>
        {/* ProgressView */}
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingVertical: 20,
            justifyContent: "space-between",
          }}
        >
          {/* Water You've Drank Label */}
          <View style={{ justifyContent: "center" }}>
            <CustomText
              label="You've drank"
              customStyle={{ color: COLORS.dark, fontSize: 30 }}
            />
            <CustomText
              label={`${waterDrank} mL`}
              customStyle={{
                color: COLORS.primary,
                fontSize: 45,
                fontFamily: "DMSansBold",
              }}
            />
            <CustomText
              label={`Water Today`}
              customStyle={{
                color: COLORS.dark,
                fontSize: 25,
              }}
            />
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <Animated.View
              style={{
                height: progressPercent,
                borderRadius: 25,
                backgroundColor: "#5abcd8",
              }}
            />
          </View>
        </View>
        {/* Add Water */}
        <TouchableOpacity onPress={() => setWaterDrank(0)}>
          <CustomText label="Reset All" customStyle={styles.reset} />
        </TouchableOpacity>
        <View style={styles.waterButtonsContainer}>
          {amounts.map((amount) => {
            return (
              <AddRemoveButton
                key={"add" + amount}
                amount={amount}
                value={waterDrank}
                setValue={setWaterDrank}
                operation="add"
              />
            );
          })}
        </View>
        {/* Remove Water */}
        <View style={styles.waterButtonsContainer}>
          {amounts.map((amount) => {
            return (
              <AddRemoveButton
                key={"remove" + amount}
                amount={amount}
                value={waterDrank}
                setValue={setWaterDrank}
                operation="remove"
              />
            );
          })}
        </View>
        <View
          style={{
            width: "100%",
            paddingVertical: 20,
            alignItems: "center",
          }}
        >
          {isNotificationScheduled ? (
            <CustomButton
              onPress={() => {
                cancelWaterReminder();
                setIsNotificationScheduled(false);
              }}
              label="Cancel Reminder"
              customStyle={[
                styles.buttonStyle,
                {
                  borderWidth: 1,
                  width: "97.5%",
                  borderColor: "#2EB5FA",
                  backgroundColor: COLORS.light,
                },
              ]}
              customTextStyle={{
                color: COLORS.primary,
                fontFamily: "DMSansSemiBold",
              }}
            />
          ) : (
            <CustomButton
              onPress={() => setIsDialogVisible(true)}
              customStyle={{ width: "97.5%" }}
              label="Set Reminder"
            />
          )}
        </View>
        <Dialog
          isVisible={isDialogVisible}
          // onBackdropPress={toggleDialog1}
          overlayStyle={{ width: "90%", borderRadius: 10 }}
        >
          <TouchableOpacity onPress={() => setIsDialogVisible(false)}>
            <Icon
              name="close-outline"
              style={{ fontSize: 30, paddingHorizontal: 1, textAlign: "right" }}
            />
          </TouchableOpacity>
          <Dialog.Title
            title="Set Water Reminder"
            titleStyle={{ padding: 5 }}
          />
          <View>
            <View>
              <CustomText
                label="After how many hours do you want the reminder to drink water?"
                customStyle={{ paddingLeft: 5 }}
              />
              <Input
                keyboardType="numeric"
                value={hours}
                onChangeText={(value) => setHours(value)}
                placeholder="Enter hours"
                maxLength={2}
                // errorMessage="Please select range from 1-24 hours"
              />
            </View>
            {hours.length > 0 && (
              <View style={styles.checkBoxContainer}>
                <CheckBox
                  checked={checkedRepeated}
                  onPress={() => setCheckedRepeated(!checkedRepeated)}
                  iconType="material-community"
                  checkedIcon="checkbox-marked"
                  uncheckedIcon="checkbox-blank-outline"
                  checkedColor={COLORS.primary}
                />
                <View style={{ display: "flex", flexShrink: 1 }}>
                  <CustomText
                    label={`Repeat Reminder after every ${hours} hours`}
                  />
                </View>
              </View>
            )}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                paddingVertical: 20,
                paddingHorizontal: 5,
              }}
            >
              <CustomButton
                isDisabled={hours.length == 0}
                onPress={() => {
                  setWaterReminder(parseInt(hours), checkedRepeated);
                  setIsNotificationScheduled(true);
                  setIsDialogVisible(false);
                }}
                label="Set Reminder"
                customStyle={styles.reminderButton}
                customTextStyle={{
                  color: COLORS.primary,
                  fontFamily: "DMSansSemiBold",
                }}
                icon={
                  <Icon
                    style={{
                      fontSize: 20,
                      color: hours.length == 0 ? "lightgray" : COLORS.primary,
                    }}
                    name="alarm-outline"
                    size={40}
                  />
                }
              />
            </View>
          </View>
        </Dialog>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  progressBarContainer: {
    borderWidth: 1,
    width: 40,
    height: 250,
    borderColor: COLORS.primary,
    borderRadius: 25,
    justifyContent: "flex-end",
  },
  waterButtonsContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    width: "100%",
    justifyContent: "space-between",
  },
  waterGoalContainer: {
    padding: 50,
  },
  buttonStyle: {
    paddingHorizontal: 18,
    paddingVertical: 15,
  },
  checkBoxContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  reminderButton: {
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
    width: "50%",
    borderColor: "#2EB5FA",
    backgroundColor: COLORS.light,
  },
  reset: {
    color: COLORS.primary,
    fontFamily: "DMSansBold",
    fontSize: 19,
    textAlign: "right",
    padding: 4,
    textDecorationLine: "underline",
  },
});
