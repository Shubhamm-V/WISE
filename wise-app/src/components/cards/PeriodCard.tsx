import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomText from "../custom-widgets/CustomText";
import React, { FC } from "react";
import { COLORS } from "@/src/constants/colors";
import Icon from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";
interface PeriodProps {
  periodDayMonth: string[];
  daysBetween: string;
  isPeriodEnded: boolean;
}
const PeriodCard: FC<PeriodProps> = ({
  periodDayMonth,
  daysBetween,
  isPeriodEnded,
}) => {
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
            onPress={() =>
              router.navigate("/period-tracker/info-screens/info-screen-1")
            }
          >
            <CustomText label="RESET" customStyle={styles.resetButton} />
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
    marginVertical: 7,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    shadowRadius: 0.84,
    shadowOpacity: 0.15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resetButton: {
    fontSize: 18,
    fontFamily: "DMSansBold",
    color: COLORS.primary,
    textDecorationLine: "underline",
  },
});
