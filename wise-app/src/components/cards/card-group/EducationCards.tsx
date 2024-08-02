import { StyleSheet, View, Image, Pressable } from "react-native";
import React from "react";
import { COLORS } from "../../../constants/colors";
import CustomText from "../../custom-widgets/CustomText";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
const EducationCards = () => {
  return (
    <View style={{ paddingHorizontal: 12, marginVertical: 6 }}>
      <View style={styles.cardContainer}>
        <Pressable
          style={styles.card}
          onPress={() => router.push("/water-reminder")}
        >
          <LinearGradient
            colors={[COLORS.lightPrimary, COLORS.light]}
            style={{
              paddingHorizontal: 13,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 15,
            }}
          >
            <View style={{ width: "39%" }}>
              <Image
                style={styles.image}
                source={require("../../../../assets/images/illustrations/education/image.png")}
              />
            </View>
            <View style={{ width: "51%", flexDirection: "column" }}>
              <CustomText
                label="Health Education"
                customStyle={{
                  flex: 1,
                  flexShrink: 1,
                  color: COLORS.primary,
                  fontFamily: "DMSansBold",
                }}
              />
              <Icon
                name="arrow-forward-outline"
                size={25}
                color={COLORS.primary}
                style={{ textAlign: "right", paddingBottom: 5 }}
              />
            </View>
          </LinearGradient>
        </Pressable>
        <Pressable
          style={styles.card}
          onPress={() => router.push("/reminders/water-reminder")}
        >
          <LinearGradient
            colors={[COLORS.lightPrimary, COLORS.light]}
            style={{
              paddingHorizontal: 13,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 15,
            }}
          >
            <View style={{ width: "38%" }}>
              <Image
                style={styles.image}
                source={require("../../../../assets/images/illustrations/water-intake/card-image.png")}
              />
            </View>
            <View style={{ width: "51%", flexDirection: "column" }}>
              <CustomText
                label="Health Education"
                customStyle={{ flex: 1, flexShrink: 1, color: COLORS.dark }}
              />
              <Icon
                name="arrow-forward-outline"
                size={25}
                color={COLORS.primary}
                style={{ textAlign: "right", paddingBottom: 5 }}
              />
            </View>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
};

export default EducationCards;

const styles = StyleSheet.create({
  card: {
    elevation: 1,
    width: "48.5%",
    backgroundColor: COLORS.light,
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: COLORS.dark,
    fontFamily: "DMSansSemiBold",
    fontSize: 17,
    marginBottom: 7,
  },
  image: {
    height: 90,
    width: 75,
    marginLeft: -5,
    marginTop: 15,
  },
});
