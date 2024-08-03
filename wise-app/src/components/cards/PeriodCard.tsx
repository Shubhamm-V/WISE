import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomText from "../custom-widgets/CustomText";
import React, { FC } from "react";
import { COLORS } from "@/src/constants/colors";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { PrevCycleDetails } from "@/src/app/(app)/period-tracker";

interface PeriodProps {
  periodDayMonth: string[];
  daysBetween: string;
  isPeriodEnded: boolean;
  periodDayMonths: string[];
  prevPeriodData: PrevCycleDetails;
}

const PeriodCard: FC<PeriodProps> = ({
  periodDayMonth,
  daysBetween,
  isPeriodEnded,
  prevPeriodData,
  periodDayMonths,
}) => {
  const router = useRouter();

  return (
    <View style={styles.periodCard}>
      <View style={{ flexDirection: "row", gap: 5, justifyContent: "center" }}>
        <Icon name="water" size={20} color={"#A40808"} />
        <CustomText
          label={
            isPeriodEnded
              ? "Period is ended"
              : parseInt(daysBetween) >= 0
              ? "Next Period"
              : "Period is ongoing"
          }
          customStyle={{ fontSize: 17, fontFamily: "DMSansBold" }}
        />
      </View>
      {isPeriodEnded ? (
        <View>
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/period-tracker/info-screens/info-screen-1",
                params: {
                  periodDayMonths: JSON.stringify(periodDayMonths),
                  prevPeriodData: JSON.stringify(prevPeriodData),
                },
              });
            }}
          >
            <CustomText
              label="Track next period"
              customStyle={styles.resetButton}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          {periodDayMonth &&
            periodDayMonth.length > 0 &&
            daysBetween.length > 0 && (
              <>
                <CustomText
                  label={periodDayMonth?.length > 0 ? periodDayMonth[0] : ""}
                  customStyle={{
                    color: COLORS.primary,
                    fontFamily: "DMSansBold",
                    textAlign: "center",
                  }}
                />
                <CustomText
                  label={
                    parseInt(daysBetween) >= 0
                      ? `${daysBetween} Days Left`
                      : `Day ${Math.abs(parseInt(daysBetween)) + 1} of period`
                  }
                  customStyle={{ textAlign: "center" }}
                />
              </>
            )}
        </View>
      )}
    </View>
  );
};

export default PeriodCard;

const styles = StyleSheet.create({
  periodCard: {
    backgroundColor: COLORS.light,
    padding: 15,
    borderRadius: 7,
    marginHorizontal: "1%",
    marginTop: 1.5,
    marginBottom: 6,
    elevation: 1,
    borderColor: "lightgray",
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resetButton: {
    fontSize: 16,
    fontFamily: "DMSansBold",
    color: COLORS.primary,
    textDecorationLine: "underline",
  },
});
