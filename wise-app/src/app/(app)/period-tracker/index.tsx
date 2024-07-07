import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";

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

const App = () => {
  const [selected, setSelected] = useState("");
  const [cycleDetails, setCycleDetails] = useState<CycleDetails>({
    cycleLength: "",
    periodLength: "",
    lastPeriod: "",
  });

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
    nextPeriodDate.setDate(startDate.getDate() + parseInt(cycleLength)); // Calculate next period date

    const markedDates: MarkedDates = {};

    // Mark each day of the period
    let endPeriodString = "";
    for (let i = 0; i < parseInt(periodLength); i++) {
      const date = new Date(nextPeriodDate);
      date.setDate(nextPeriodDate.getDate() + i);
      const dateString = date.toISOString().split("T")[0];
      markedDates[dateString] = {
        marked: true,
        // @ts-ignore
        color: "#E0F7FA",
        dotColor: "transparent",
      };
      endPeriodString = dateString;
    }

    // Add startingDay: true to the first day if it doesn't exist
    if (Object.keys(markedDates).length > 0) {
      const firstDay = Object.keys(markedDates)[0];
      //@ts-ignore
      if (!markedDates[firstDay].startingDay) {
        //@ts-ignore
        markedDates[firstDay].startingDay = true;
      }
    }

    // Add endingDay: true to the last day if it doesn't exist
    if (endPeriodString !== "") {
      // @ts-ignore
      if (!markedDates[endPeriodString].endingDay) {
        // @ts-ignore
        markedDates[endPeriodString].endingDay = true;
      }
    }

    return markedDates;
  };

  return (
    <SafeAreaView>
      <Calendar
        onDayPress={(day: any) => {
          setSelected(day.dateString);
        }}
        markingType={"period"}
        markedDates={markPeriodDates()}
      />
    </SafeAreaView>
  );
};

export default App;
