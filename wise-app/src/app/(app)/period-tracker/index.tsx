import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";
import { COLORS } from "@/src/constants/colors";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Overlay } from "@rneui/themed";
import CustomText from "@/src/components/custom-widgets/CustomText";
import {
  getFormattedDate,
  getDateMonth,
  calculateDaysBetween,
} from "@/src/utils/dateFormatting";
import PeriodCard from "@/src/components/cards/PeriodCard";
import CustomButton from "@/src/components/custom-widgets/CustomButton";
import PeriodData from "@/src/components/trackdata/PeriodData";
import FeelingData from "@/src/components/trackdata/Feelings";
import SymptomsData from "@/src/components/trackdata/SymptomsData";
import { router } from "expo-router";
import Loading from "@/src/components/custom-widgets/Loading";
interface CycleDetails {
  cycleLength: string;
  periodLength: string;
  lastPeriod: string;
}

interface MarkedDates {
  [date: string]: {
    marked: boolean;
    selected?: boolean;
    selectedColor?: string;
    // Add any other properties as needed
  };
}

const TrackMenustralCycle = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [daysBetween, setDaysBetween] = useState<string>("");
  const [periodDayMonth, setPeriodDayMonth] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [isPeriodEnded, setIsPeriodEnded] = useState<boolean>(false);
  const [cycleDetails, setCycleDetails] = useState<CycleDetails>({
    cycleLength: "",
    periodLength: "",
    lastPeriod: "",
  });

  // Removing passed dates from localstorage
  const removePeriodDays = async () => {
    const keysToRemove = periodDayMonth.map((periodDay) => {
      return periodDay.replace(/\s+/g, "");
    });
    for (const key of keysToRemove) {
      await AsyncStorage.removeItem(`${key}-flow`);
      await AsyncStorage.removeItem(`${key}-feelings`);
      await AsyncStorage.removeItem(`${key}-symptoms`);
    }
  };

  // Fetching cycle detail from local storage
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

  const markPeriodDates = (): MarkedDates => {
    const { cycleLength, periodLength, lastPeriod } = cycleDetails;
    if (!cycleLength || !periodLength || !lastPeriod) return {};

    const startDate = new Date(lastPeriod);
    const nextPeriodDate = new Date(startDate);
    // calculating next period date
    nextPeriodDate.setDate(startDate.getDate() + parseInt(cycleLength));

    let markedDates: MarkedDates = {};

    // Mark each day of the period
    let periodDates: string[] = [];
    let endPeriodString = "";
    for (let i = 0; i < parseInt(periodLength); i++) {
      const date = new Date(nextPeriodDate);
      date.setDate(nextPeriodDate.getDate() + i);
      const dateString = date.toISOString().split("T")[0];
      periodDates.push(dateString);
      markedDates[dateString] = {
        marked: true,
        // @ts-ignore
        selected: true,
        // @ts-ignore
        color: "#FDADBE",
        dotColor: "transparent",
      };
      endPeriodString = dateString;
    }

    if (Object.keys(markedDates).length > 0) {
      const firstDay = Object.keys(markedDates)[0];
      //@ts-ignore
      if (!markedDates[firstDay].startingDay) {
        //@ts-ignore
        markedDates[firstDay].startingDay = true;
      }
    }

    if (endPeriodString !== "") {
      // @ts-ignore
      if (!markedDates[endPeriodString].endingDay) {
        // @ts-ignore
        markedDates[endPeriodString].endingDay = true;
      }
    }

    // Setting Days between today and Next Period
    const todayDate = getFormattedDate();

    const totalBetweenDays = calculateDaysBetween(todayDate, periodDates[0]);
    if (daysBetween == "") setDaysBetween(totalBetweenDays.toString());

    // Marking Dot on today's date in calendar
    markedDates[todayDate] = {
      marked: true,
      // @ts-ignore
      dotColor: "transparent",
      // @ts-ignore
      color: "#F5DFFC",
    };

    // Formatting period dates (e.g 20 July) for tracking periods
    const formattedPeriods = periodDates.map(getDateMonth);
    if (periodDayMonth && periodDayMonth.length == 0)
      setPeriodDayMonth(formattedPeriods);

    // Checking if period is already done or not
    const date1 = new Date();
    const date2 = new Date(endPeriodString);

    if (date1 > date2) {
      if (!isPeriodEnded) setIsPeriodEnded(true);
    }
    if (selectedDay.length === 0) setSelectedDay(formattedPeriods[0]);
    return markedDates;
  };

  const handleDateSelect = (periodDay: string) => {
    setSelectedDay(periodDay);
  };

  if (loading) return <Loading />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.light }}>
      <ScrollView>
        <Overlay isVisible={isOverlayVisible}>
          <CustomText
            label="Are you sure you want to edit period dates?"
            customStyle={{ padding: 10, fontSize: 18 }}
          />
          <View style={styles.overlayOptions}>
            <TouchableOpacity
              onPress={() => {
                removePeriodDays();
                router.navigate("/period-tracker/info-screens/info-screen-1");
              }}
            >
              <CustomText
                label="Yes"
                customStyle={{ color: COLORS.primary, fontSize: 18 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsOverlayVisible(false)}>
              <CustomText
                label="No"
                customStyle={{ color: COLORS.primary, fontSize: 18 }}
              />
            </TouchableOpacity>
          </View>
        </Overlay>
        <View style={styles.header}>
          <CustomText label="Track Periods" customStyle={styles.title} />
          <CustomButton
            label="Edit"
            onPress={() => {
              setIsOverlayVisible(true);
            }}
            customStyle={styles.editButton}
            customTextStyle={{
              color: COLORS.primary,
              fontFamily: "DMSansSemiBold",
            }}
            icon={
              <Icon
                style={{ fontSize: 16, color: COLORS.primary }}
                name="create-outline"
                size={40}
              />
            }
          />
        </View>
        <View style={styles.calendarContainer}>
          <Calendar
            style={{ borderRadius: 5 }}
            onDayPress={(day: any) => {
              setSelectedDate(day.dateString);
            }}
            markingType={"period"}
            markedDates={markPeriodDates()}
          />
        </View>
        <PeriodCard
          periodDayMonth={periodDayMonth}
          daysBetween={daysBetween}
          isPeriodEnded={isPeriodEnded}
        />

        <View style={styles.tagContainer}>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            {periodDayMonth.map((periodDay, ind) => (
              <TouchableOpacity
                onPress={() => handleDateSelect(periodDay)}
                style={[
                  styles.tag,
                  {
                    backgroundColor:
                      selectedDay === periodDay
                        ? COLORS.lightPrimary
                        : "transparent",
                    marginLeft: ind === 0 ? -10 : 5,
                    marginRight: ind == periodDay.length - 1 ? 0 : 5,
                  },
                ]}
                key={ind}
              >
                <CustomText
                  label={periodDay}
                  customStyle={{
                    color: COLORS.primary,
                    fontFamily: "DMSansBold",
                  }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <PeriodData selectedDay={selectedDay} />
        <FeelingData selectedDay={selectedDay} />
        <SymptomsData selectedDay={selectedDay} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TrackMenustralCycle;

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontFamily: "DMSansBold",
    marginVertical: 10,
  },
  calendarContainer: {
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 5,
    marginHorizontal: "1%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    padding: "1%",
  },
  editButton: {
    borderWidth: 1,
    width: 100,
    marginTop: 10,
    paddingVertical: 7,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.light,
  },
  tagContainer: {
    gap: 10,
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: "1%",
    paddingVertical: "2%",
  },
  tag: {
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  overlayOptions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});
