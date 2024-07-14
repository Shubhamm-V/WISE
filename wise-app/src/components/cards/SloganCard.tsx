import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Card } from "@rneui/themed";
import { COLORS } from "@/src/constants/colors";
import CustomText from "../custom-widgets/CustomText";
import { LinearGradient } from "expo-linear-gradient";
import { SLOGANS } from "@/src/constants/health-data/slogans";
import { color } from "@rneui/base";
const SloganCard = () => {
  return (
    <LinearGradient
      colors={[COLORS.lightPrimary, COLORS.light]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={{ width: "68%" }}>
        <CustomText
          label="Quote of the Day"
          customStyle={{ fontSize: 18, fontFamily: "DMSansBold" }}
        />
        <CustomText
          label={SLOGANS[Math.floor(Math.random() * SLOGANS.length)]}
          customStyle={styles.slogan}
        />
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
    </LinearGradient>
  );
};

export default SloganCard;

const styles = StyleSheet.create({
  card: {
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    marginTop: 12,
    borderRadius: 8,
    shadowRadius: 0.84,
    shadowOpacity: 0.15,
    marginHorizontal: 10,
    shadowColor: "#52006A",
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 13,
    paddingVertical: 15,
    backgroundColor: COLORS.light,
    justifyContent: "space-between",
  },
  image: {
    marginTop: 30,
    height: 85,
    width: 85,
  },
  slogan: {
    fontSize: 15,
    paddingVertical: 10,
    fontFamily: "DMSansItalic",
    color: COLORS.dark,
  },
});
