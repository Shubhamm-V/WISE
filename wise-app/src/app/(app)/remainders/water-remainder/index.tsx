import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ConfettiCannon from "react-native-confetti-cannon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { AddRemoveButton } from "@/src/components/custom-widgets/AddRemoveButton";
import CustomButton from "@/src/components/custom-widgets/CustomButton";
import { COLORS } from "@/src/constants/colors";
import CustomText from "@/src/components/custom-widgets/CustomText";

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
      setValue(Number(value));
    }
  } catch (e) {
    // error reading value
    console.log(e);
  }
};

const renderConfetti = () => {
  return <ConfettiCannon count={200} origin={{ x: 0, y: 0 }} fadeOut={true} />;
};

// Notifications

async function scheduleNotification() {
  await Notifications.requestPermissionsAsync().then((permission) => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "💧 Water Reminder",
        subtitle: "Your body needs water!",
      },
      trigger: {
        repeats: true,
        seconds: 300,
      },
    });
  });
}

export default function App() {
  const [fillingPercentage, setFillingPercentage] = useState(0);
  const [waterGoal, setWaterGoal] = useState(3000);
  const [waterDrank, setWaterDrank] = useState(0);
  const [isGoalAchieved, setIsGoalAchieved] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Progress Bar Animation
  const barHeight = useRef(new Animated.Value(0)).current;
  const progressPercent = barHeight.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", `100%`],
  });

  useEffect(() => {
    getData("@amount", setWaterDrank);
    getData("@goal", setWaterGoal);
  }, []);

  useEffect(() => {
    Animated.timing(barHeight, {
      duration: 1000,
      toValue: fillingPercentage / 3,
      useNativeDriver: false,
    }).start();
  }, [fillingPercentage]);

  // End of Progress Bar Animation

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
    }
    if (waterDrank < waterGoal && isGoalAchieved === true) {
      setIsGoalAchieved(false);
    }

    if (showConfetti === false && isGoalAchieved === true) {
      setShowConfetti(true);
    } else {
      setShowConfetti(false);
    }
  }, [waterDrank, isGoalAchieved, waterGoal]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 20 }}
      >
        {showConfetti && renderConfetti()}
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
              style={{ paddingHorizontal: 5 }}
              onPress={() => setWaterGoal(waterGoal + 250)}
            >
              <Ionicons
                name="add-circle-outline"
                size={30}
                color={COLORS.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingHorizontal: 5 }}
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
          {/* Water You've Drunk Label */}
          <View style={{ justifyContent: "center" }}>
            <CustomText
              label="You've drunk"
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
                backgroundColor: "#5abcd8",
              }}
            />
          </View>
        </View>

        {/* Add Water */}
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
            paddingVertical: 20,
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <CustomButton
            onPress={() => scheduleNotification()}
            label="Schedule"
            customStyle={{ width: "48%" }}
          />
          <CustomButton
            onPress={() => Notifications.cancelAllScheduledNotificationsAsync()}
            label="Cancel"
            customStyle={[
              styles.buttonStyle,
              {
                borderWidth: 1,
                width: "48%",
                borderColor: "#2EB5FA",
                backgroundColor: COLORS.light,
              },
            ]}
            customTextStyle={{
              color: COLORS.primary,
              fontFamily: "DMSansSemiBold",
            }}
          />
        </View>
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
});
