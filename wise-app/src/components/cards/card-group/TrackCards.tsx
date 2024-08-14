import { StyleSheet, Image, View } from "react-native";
import React from "react";
import { COLORS } from "../../../constants/colors";
import CustomText from "../../custom-widgets/CustomText";
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "../../custom-widgets/CustomButton";
import { router } from "expo-router";
import { useAuth } from "@/src/context/authContext";

const cardsData = [
  {
    label: "Track Periods",
    description: "Log menstruation flow, symptoms and feelings",
    imageSource: require("../../../../assets/images/illustrations/period-tracker/card-images/image.png"),
    buttonLabel: "Track",
    path: "/period-tracker",
  },
  {
    label: "Water Intake",
    description: "Track daily water intake, set goal and reminder",
    imageSource: require("../../../../assets/images/illustrations/water-intake/card-image.png"),
    buttonLabel: "Track",
    path: "/water-reminder",
  },
];

const TrackCards = () => {
  const { setFlag } = useAuth();
  return (
    <View style={styles.cardContainer}>
      {cardsData.map((card, index) => (
        <View key={index} style={styles.card}>
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
                <Image style={styles.image} source={card.imageSource} />
              </View>
              <View style={{ width: "100%" }}>
                <CustomText
                  label={card.label}
                  customStyle={{
                    flex: 1,
                    textAlign: "center",
                    padding: 5,
                    fontFamily: "DMSansBold",
                    color: COLORS.primary,
                  }}
                />
                <CustomText
                  label={card.description}
                  customStyle={{
                    fontSize: 12,
                    padding: 5,
                    textAlign: "center",
                  }}
                />
              </View>
              <View style={{ alignItems: "center", marginTop: 10 }}>
                <CustomButton
                  onPress={() => {
                    if (index == 0) setFlag((prev) => !prev);
                    router.navigate(card.path);
                  }}
                  label={card.buttonLabel}
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
      ))}
    </View>
  );
};

export default TrackCards;

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
