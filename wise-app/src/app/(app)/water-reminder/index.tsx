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
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { AddRemoveButton } from "@/src/components/custom-widgets/AddRemoveButton";
import CustomButton from "@/src/components/custom-widgets/CustomButton";
import { COLORS } from "@/src/constants/colors";
import CustomText from "@/src/components/custom-widgets/CustomText";
import Icon from "react-native-vector-icons/Ionicons";
import { Dialog } from "@rneui/themed";
import Toast from "react-native-root-toast";
import { Input } from "@rneui/themed";
const amounts = [250, 500, 750, 1000, 1500];

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

async function setWaterReminder(hours: number) {
  const permission = await Notifications.requestPermissionsAsync();
  const seconds = hours * 20;
  if (permission.status === "granted") {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "💧 Water Reminder",
        sound: "default",
        subtitle: "Your body needs water!",
      },
      trigger: {
        repeats: false,
        seconds, // Convert hours to seconds
      },
    });
    await AsyncStorage.setItem("waterNotificationId", notificationId);
    Toast.show("Water reminder has been set");
  } else {
    Toast.show("Permission to send notifications was denied");
  }
}

// async function cancelWaterReminder() {
//   try {
//     const notificationId = await AsyncStorage.getItem("waterNotificationId");
//     if (notificationId) {
//       await Notifications.cancelScheduledNotificationAsync(notificationId);

//       Toast.show(`Reminder has been cancelled`);
//     } else {
//       // console.log("No notification ID found.");
//     }
//   } catch (error) {
//     console.error("Error cancelling notification:", error);
//   }
// }

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
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
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
      if (isAdded == true) {
        setTimeout(() => {
          Alert.alert("Your today's goal achieved 🎉");
        }, 1000);
      }
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
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.innerContainer}>
          {/* Water Goal */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CustomText label="Track Water Intake" customStyle={styles.title} />
            {waterDrank > 0 && (
              <TouchableOpacity onPress={() => setWaterDrank(0)}>
                <CustomText label="Reset All" customStyle={styles.reset} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.goalHeader}>
            <CustomText
              label="Set today's goal"
              customStyle={{
                fontSize: 18,
                color: COLORS.primary,
                fontFamily: "DMSansBold",
              }}
            />

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <CustomText
                label={`${waterGoal} mL`}
                customStyle={{ fontSize: 17 }}
              />

              {/* Add Goal */}
              <TouchableOpacity
                style={{ paddingHorizontal: 3 }}
                onPress={() => setWaterGoal(waterGoal + 250)}
              >
                <Icon
                  name="add-circle-outline"
                  size={30}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ paddingHorizontal: 1 }}
                onPress={() => setWaterGoal(waterGoal - 250)}
              >
                <Icon name="remove-circle" size={30} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.waterContainer}>
            <View style={{ justifyContent: "center" }}>
              <CustomText
                label="You've drank"
                customStyle={{ color: COLORS.dark, fontSize: 18 }}
              />
              <CustomText
                label={`${waterDrank} mL`}
                customStyle={{
                  color: COLORS.primary,
                  fontSize: 35,
                  fontFamily: "DMSansBold",
                }}
              />
              <CustomText
                label={`water today`}
                customStyle={{
                  color: COLORS.dark,
                  fontSize: 20,
                }}
              />
            </View>

            <View>
              <View style={styles.progressBarContainer}>
                <Animated.View
                  style={{
                    height: progressPercent,
                    borderRadius: 25,
                    backgroundColor: COLORS.primary,
                  }}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: COLORS.lightPrimary,
              borderRadius: 8,
            }}
          >
            <View style={styles.waterButtonsContainer}>
              {amounts.map((amount) => {
                return (
                  <AddRemoveButton
                    key={"add" + amount}
                    amount={amount}
                    value={waterDrank}
                    setValue={(val) => {
                      setWaterDrank(val), setIsAdded(true);
                    }}
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
                    setValue={(val) => {
                      setWaterDrank(val), setIsAdded(true);
                    }}
                    operation="remove"
                  />
                );
              })}
            </View>
          </View>
          <View
            style={{
              width: "100%",
              paddingVertical: 20,
              alignItems: "center",
            }}
          >
            <CustomButton
              onPress={() => setIsDialogVisible(true)}
              customStyle={{ width: "100%" }}
              label="Set water reminder"
            />
          </View>

          <Dialog
            isVisible={isDialogVisible}
            // onBackdropPress={toggleDialog1}
            overlayStyle={{ width: "90%", borderRadius: 10 }}
          >
            <TouchableOpacity onPress={() => setIsDialogVisible(false)}>
              <Icon
                name="close-outline"
                style={{
                  fontSize: 30,
                  paddingHorizontal: 1,
                  textAlign: "right",
                }}
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
                    setWaterReminder(parseInt(hours));
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: COLORS.light,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
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
    paddingHorizontal: 5,
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
    borderColor: COLORS.primary,
    backgroundColor: COLORS.light,
  },
  reset: {
    color: COLORS.primary,
    fontFamily: "DMSansBold",
    fontSize: 19,
    padding: 10,
    textDecorationLine: "underline",
  },
  title: {
    fontSize: 20,
    color: COLORS.dark,
    fontFamily: "DMSansBold",
    marginVertical: 15,
  },
  goalHeader: {
    paddingHorizontal: 7,
    borderWidth: 1,
    borderColor: COLORS.lightPrimary,
    borderRadius: 10,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  waterContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: COLORS.lightPrimary,
    marginVertical: 10,
    borderRadius: 8,
    paddingVertical: 20,
    justifyContent: "space-between",
  },
});
