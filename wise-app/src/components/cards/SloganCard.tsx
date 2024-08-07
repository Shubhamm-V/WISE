import { StyleSheet, View, Image } from "react-native";
import React from "react";
import { COLORS } from "@/src/constants/colors";
import CustomText from "../custom-widgets/CustomText";
import { SLOGANS } from "@/src/constants/health-data/slogans";

const getQuoteIndexForToday = () => {
  const start = new Date("2024-01-01");
  const now = new Date();
  const diff = Math.floor(
    (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );
  return diff % SLOGANS.length;
};

const quoteIndex = getQuoteIndexForToday();
const quote = SLOGANS[quoteIndex];
const SloganCard = () => {
  return (
    <View style={styles.card}>
      <View style={{ width: "68%" }}>
        <CustomText
          label="Today's quote"
          customStyle={{
            fontSize: 15,
            color: COLORS.primary,
            fontFamily: "DMSansBold",
          }}
        />
        <CustomText label={quote} customStyle={styles.slogan} />
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Image
          style={styles.image}
          source={require("../../../assets/images/illustrations/slogan-women.png")}
        />
      </View>
    </View>
  );
};

export default SloganCard;

const styles = StyleSheet.create({
  card: {
    padding: 13,
    elevation: 1,
    marginTop: 12,
    borderRadius: 10,
    backgroundColor: "#F3ECFB",
    marginHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    height: 85,
    width: 85,
  },
  slogan: {
    fontSize: 13,
    paddingVertical: 10,
    fontFamily: "DMSansItalic",
    color: COLORS.dark,
  },
});
