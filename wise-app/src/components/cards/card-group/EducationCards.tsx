import { StyleSheet, View, Image, Pressable } from "react-native";
import React from "react";
import { COLORS } from "../../../constants/colors";
import CustomText from "../../custom-widgets/CustomText";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const cardsData = [
  {
    label: "Watch Videos",
    imageSource: require("../../../../assets/images/illustrations/education/video-card.png"),
    link: "/videos",
  },
  {
    label: "Read Booklets",
    imageSource: require("../../../../assets/images/illustrations/education/booklet-card.png"),
    link: "/booklets",
  },
];

const EducationCards = () => {
  return (
    <View style={{ paddingHorizontal: 12 }}>
      <View style={styles.cardContainer}>
        {cardsData.map((card, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.gradientWrapper}>
              <LinearGradient
                colors={[COLORS.lightPrimary, "#F1ECF6"]}
                style={styles.gradient}
              >
                <View style={{ width: "54%" }}>
                  <Image style={styles.image} source={card.imageSource} />
                </View>
                <View style={{ width: "46%", flexDirection: "column" }}>
                  <CustomText
                    label={card.label}
                    customStyle={{
                      flex: 1,
                      flexShrink: 1,
                      color: COLORS.primary,
                      fontFamily: "DMSansBold",
                    }}
                  />
                  <Pressable onPress={() => router.push(card.link)}>
                    <Icon
                      name="arrow-forward-outline"
                      size={25}
                      color={COLORS.primary}
                      style={{ textAlign: "right", paddingBottom: 5 }}
                    />
                  </Pressable>
                </View>
              </LinearGradient>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default EducationCards;

const styles = StyleSheet.create({
  card: {
    width: "48.5%",
    elevation: 1,
    backgroundColor: COLORS.light,
    borderRadius: 8,
    overflow: "hidden",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gradientWrapper: {
    borderRadius: 5,
    overflow: "hidden",
  },
  gradient: {
    paddingHorizontal: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
    borderRadius: 5,
  },
  image: {
    height: 77,
    width: 68,
    marginLeft: -5,
    marginTop: 10,
  },
});
