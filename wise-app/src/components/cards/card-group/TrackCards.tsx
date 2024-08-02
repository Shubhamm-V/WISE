import { StyleSheet, Image, View } from "react-native";
import React from "react";
import { COLORS } from "../../../constants/colors";
import CustomText from "../../custom-widgets/CustomText";
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "../../custom-widgets/CustomButton";

const EducationCards = () => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.gradientContainer}>
          <LinearGradient
            colors={["#F1ECF6", COLORS.lightPrimary]}
            style={styles.gradient}
          >
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
                borderRadius: 50,
              }}
            >
              <Image
                style={styles.image}
                source={require("../../../../assets/images/illustrations/period-tracker/info-screen/step-2.png")}
              />
            </View>
            <View style={{ width: "100%" }}>
              <CustomText
                label="Track Periods"
                customStyle={{
                  flex: 1,
                  textAlign: "center",
                  padding: 5,
                  fontFamily: "DMSansBold",
                  color: COLORS.primary,
                }}
              />
              <CustomText
                label="Log menstruation flow, symptoms and feelings"
                customStyle={{
                  fontSize: 12,
                  padding: 5,
                  textAlign: "center",
                }}
              />
            </View>
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <CustomButton
                label="Track"
                customStyle={{
                  paddingVertical: 6,
                  borderRadius: 100,
                  width: "80%",
                }}
              />
            </View>
          </LinearGradient>
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.gradientContainer}>
          <LinearGradient
            colors={["#F1ECF6", COLORS.lightPrimary]}
            style={styles.gradient}
          >
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Image
                style={styles.image}
                source={require("../../../../assets/images/illustrations/water-intake/card-image.png")}
              />
            </View>
            <View style={{ width: "100%" }}>
              <CustomText
                label="Water Intake"
                customStyle={{
                  flex: 1,
                  textAlign: "center",
                  padding: 5,
                  fontFamily: "DMSansBold",
                  color: COLORS.primary,
                }}
              />
              <CustomText
                label="Track daily water intake, set goal and reminder"
                customStyle={{
                  fontSize: 12,
                  padding: 5,
                  textAlign: "center",
                }}
              />
            </View>
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <CustomButton
                label="Track"
                customStyle={{
                  paddingVertical: 6,
                  borderRadius: 100,
                  width: "80%",
                }}
              />
            </View>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

export default EducationCards;

const styles = StyleSheet.create({
  card: {
    elevation: 1,
    width: "48.5%",
    borderRadius: 50,
    backgroundColor: COLORS.light,
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginVertical: 10,
  },
  title: {
    color: COLORS.dark,
    fontFamily: "DMSansSemiBold",
    fontSize: 17,
    marginBottom: 7,
  },
  image: {
    height: 100,
    width: 102,
    marginLeft: -5,
  },
  gradientContainer: {
    borderRadius: 10,
    overflow: "hidden",
  },
  gradient: {
    borderRadius: 10,
  },
});
