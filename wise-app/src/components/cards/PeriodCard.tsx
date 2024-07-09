import { StyleSheet, Text, View } from "react-native";
import CustomText from "../custom-widgets/CustomText";
import React, { FC } from "react";
import { COLORS } from "@/src/constants/colors";
import Icon from "react-native-vector-icons/Ionicons";
interface PeriodProps {
  periodDayMonth: string[];
  daysBetween: string;
}
const PeriodCard: FC<PeriodProps> = ({ periodDayMonth, daysBetween }) => {
  return (
    <View style={styles.periodCard}>
      <View style={{ flexDirection: "row", gap: 5, justifyContent: "center" }}>
        <Icon name="water" size={20} color={"#A40808"} />
        <CustomText
          label="Next Period"
          customStyle={{ fontSize: 18, fontFamily: "DMSansBold" }}
        />
      </View>
      <View>
        <CustomText
          label={periodDayMonth?.length > 0 ? periodDayMonth[0] : ""}
          customStyle={{
            color: COLORS.primary,
            fontFamily: "DMSansBold",
            textAlign: "center",
          }}
        />
        <CustomText
          label={`${daysBetween} Days Left`}
          customStyle={{ textAlign: "center" }}
        />
      </View>
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
});
