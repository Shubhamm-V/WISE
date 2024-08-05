import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";
import { CALANDER_THEME, COLORS } from "@/src/constants/colors";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
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
import { useAuth } from "@/src/context/authContext";

interface CycleDetails {
  cycleLength: string;
  periodLength: string;
  lastPeriod: string;
}

export interface PrevCycleDetails {
  prevPeriodDate: string;
  prevPeriodLength: string;
}

interface MarkedDates {
  [date: string]: {
    marked: boolean;
    selected?: boolean;
    selectedColor?: string;
    startingDay?: boolean;
    endingDay?: boolean;
    // Add any other properties as needed
  };
}

const TrackMenstrualCycle = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [allPeriodDataString, setAllPeriodString] = useState<string | null>("");
  const [prevPeriodData, setPrevPeriodData] = useState<PrevCycleDetails>({
    prevPeriodDate: "",
    prevPeriodLength: "",
  });
  const [daysBetween, setDaysBetween] = useState<string>("");
  const [periodDayMonths, setPeriodDayMonths] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [isPeriodEnded, setIsPeriodEnded] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [cycleDetails, setCycleDetails] = useState<CycleDetails>({
    cycleLength: "",
    periodLength: "",
    lastPeriod: "",
  });
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});

  useEffect(() => {
    const fetchCycleDetails = async () => {
      const [cycleLength, periodLength, lastPeriod, allPeriods] =
        await Promise.all([
          AsyncStorage.getItem(`${user.userId}-cycleLength`),
          AsyncStorage.getItem(`${user.userId}-periodLength`),
          AsyncStorage.getItem(`${user.userId}-lastPeriod`),
          AsyncStorage.getItem(`${user.userId}-allPeriodsData`),
        ]);
      setAllPeriodString(allPeriods);
      if (!cycleLength || !periodLength || !lastPeriod) {
        setLoading(false);
        router.push("/period-tracker/info-screens/info-screen-1");
      } else {
        setCycleDetails({
          cycleLength: cycleLength ?? "",
          periodLength: periodLength ?? "",
          lastPeriod: lastPeriod ?? "",
        });
        setLoading(false);
      }
    };

    fetchCycleDetails();
  }, []);

  useEffect(() => {
    const fetchMarkedDates = async () => {
      const dates = await markPeriodDates();
      setMarkedDates(dates);
    };

    if (
      cycleDetails.cycleLength &&
      cycleDetails.periodLength &&
      cycleDetails.lastPeriod
    ) {
      fetchMarkedDates();
    }
  }, [cycleDetails]);

  const getPreviousPeriodRange = async () => {
    if (!loaded) setLoading(true);
    let markPreviousPeriodDates: MarkedDates = {};
    if (allPeriodDataString && allPeriodDataString.length > 0) {
      const allPeriodDataArray = JSON.parse(allPeriodDataString);
      for (let i = 0; i < allPeriodDataArray.length; i++) {
        const periodLength = allPeriodDataArray[i].prevPeriodLength;
        let prevPeriodDate = new Date(allPeriodDataArray[i].prevPeriodDate);
        let markedDates: MarkedDates = {};

        // Mark each day of the period
        let periodDates: string[] = [];
        let endPeriodString = "";
        for (let j = 0; j < parseInt(periodLength); j++) {
          const date = new Date(prevPeriodDate);
          date.setDate(prevPeriodDate.getDate() + j);
          const dateString = date.toISOString().split("T")[0];
          periodDates.push(dateString);
          markedDates[dateString] = {
            marked: true,
            // @ts-ignore
            color: "#fdd6df",
            dotColor: "transparent",
          };
          endPeriodString = dateString;
        }

        if (Object.keys(markedDates).length > 0) {
          const firstDay = Object.keys(markedDates)[0];
          if (!markedDates[firstDay].startingDay) {
            markedDates[firstDay].startingDay = true;
          }
        }

        if (endPeriodString !== "") {
          if (!markedDates[endPeriodString].endingDay) {
            markedDates[endPeriodString].endingDay = true;
          }
        }
        markPreviousPeriodDates = {
          ...markPreviousPeriodDates,
          ...markedDates,
        };
      }
    }
    setLoading(false);
    setLoaded(true);
    return markPreviousPeriodDates;
  };

  const markPeriodDates = async () => {
    const { cycleLength, periodLength, lastPeriod } = cycleDetails;
    if (!cycleLength || !periodLength || !lastPeriod) return {};

    const startDate = new Date(lastPeriod);
    const nextPeriodDate = new Date(startDate);
    nextPeriodDate.setDate(startDate.getDate() + parseInt(cycleLength));

    if (!prevPeriodData.prevPeriodDate || !prevPeriodData.prevPeriodLength)
      setPrevPeriodData({
        prevPeriodDate: nextPeriodDate.toISOString(),
        prevPeriodLength: periodLength,
      });

    const previousPeriodsRange: MarkedDates = await getPreviousPeriodRange();

    let markedDates: MarkedDates = {};

    let periodDates: string[] = [];
    let endPeriodString = "";
    for (let i = 0; i < parseInt(periodLength); i++) {
      const date = new Date(nextPeriodDate);
      date.setDate(nextPeriodDate.getDate() + i);
      const dateString = date.toISOString().split("T")[0];
      periodDates.push(dateString);
      markedDates[dateString] = {
        marked: true,
        selected: true,
        //@ts-ignore
        color: "#fb8da4",
        dotColor: "transparent",
      };
      endPeriodString = dateString;
    }

    if (Object.keys(markedDates).length > 0) {
      const firstDay = Object.keys(markedDates)[0];
      if (!markedDates[firstDay].startingDay) {
        markedDates[firstDay].startingDay = true;
      }
    }

    if (endPeriodString !== "") {
      if (!markedDates[endPeriodString].endingDay) {
        markedDates[endPeriodString].endingDay = true;
      }
    }

    const todayDate = getFormattedDate();

    const totalBetweenDays = calculateDaysBetween(todayDate, periodDates[0]);
    if (daysBetween === "") setDaysBetween(totalBetweenDays.toString());

    markedDates[todayDate] = {
      marked: true,
      //@ts-ignore
      dotColor: "transparent",
      color: COLORS.lightPrimary,
    };

    const formattedPeriods = periodDates.map(getDateMonth);
    if (periodDayMonths.length === 0) setPeriodDayMonths(formattedPeriods);

    const date1 = new Date();
    const date2 = new Date(endPeriodString);

    if (date1 > date2) {
      if (!isPeriodEnded) setIsPeriodEnded(true);
    }
    if (selectedDay.length === 0) setSelectedDay(formattedPeriods[0]);
    markedDates = { ...previousPeriodsRange, ...markedDates };
    return markedDates;
  };

  const handleDateSelect = (periodDay: string) => {
    setSelectedDay(periodDay);
  };

  if (loading) return <Loading />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.light }}>
      <ScrollView>
        <View style={styles.header}>
          <CustomText label="Track Periods" customStyle={styles.title} />
          <CustomButton
            label="Edit"
            onPress={() => {
              router.push({
                pathname: "/period-tracker/info-screens/info-screen-1",
                params: { periodDayMonths: periodDayMonths },
              });
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
        <View>
          <View style={styles.calendarContainer}>
            <Calendar
              style={{ borderRadius: 5 }}
              onDayPress={(day: any) => {
                setSelectedDate(day.dateString);
              }}
              theme={{ ...CALANDER_THEME, textDayFontSize: 14 }}
              markingType={"period"}
              markedDates={markedDates}
            />
          </View>
          <View style={styles.markInfo}>
            <View style={styles.boxContainer}>
              <View style={[styles.box, { backgroundColor: "#fb8da4" }]}></View>
              <CustomText label="Next period" customStyle={{ fontSize: 12 }} />
            </View>
            <View style={styles.boxContainer}>
              <View
                style={[styles.box, { backgroundColor: COLORS.lightPrimary }]}
              ></View>
              <CustomText label="Today's date" customStyle={{ fontSize: 12 }} />
            </View>
            <View style={styles.boxContainer}>
              <View style={[styles.box, { backgroundColor: "#fdd6df" }]}></View>
              <CustomText
                label="Previous periods"
                customStyle={{ fontSize: 12 }}
              />
            </View>
          </View>
        </View>
        <PeriodCard
          periodDayMonth={periodDayMonths}
          daysBetween={daysBetween}
          isPeriodEnded={isPeriodEnded}
          periodDayMonths={periodDayMonths}
          prevPeriodData={prevPeriodData}
        />

        <View style={styles.tagContainer}>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            {periodDayMonths.map((periodDay, ind) => (
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
                    marginRight: ind === periodDayMonths.length - 1 ? 0 : 5,
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

export default TrackMenstrualCycle;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: COLORS.dark,
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
  box: {
    height: 12,
    width: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  boxContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "33%",
    gap: 5,
  },
  markInfo: {
    flexDirection: "row",
    marginHorizontal: "1%",
    marginVertical: 5,
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "lightgray",
  },
});
