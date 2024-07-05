import { StyleSheet, View, Image, Pressable } from "react-native";
import React from "react";
import { COLORS } from "@/src/constants/colors";
import CustomText from "../custom-widgets/CustomText";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
const TrackCards = () => {
  return (
    <View style={{ paddingHorizontal: 10, marginVertical: 10 }}>
      <CustomText label="Set Remainders" customStyle={styles.title} />
      <View style={styles.cardContainer}>
        <Pressable
          style={styles.card}
          onPress={() => router.push("/remainders/water-remainder")}
        >
          <LinearGradient
            colors={["#E0F7FA", COLORS.light]}
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
                source={require("../../../assets/images/illustrations/water-intake/card-image.png")}
              />
            </View>
            <View style={{ width: "51%", flexDirection: "column" }}>
              <CustomText
                label="Water Remainder"
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
        <Pressable
          style={styles.card}
          onPress={() => router.push("/remainders/water-remainder")}
        >
          <LinearGradient
            colors={["#E0F7FA", COLORS.light]}
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
                source={require("../../../assets/images/illustrations/education/image.png")}
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

export default TrackCards;

const styles = StyleSheet.create({
  card: {
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    borderRadius: 5,
    shadowRadius: 0.84,
    shadowOpacity: 0.15,
    shadowColor: "#52006A",

    width: "49%",
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
    height: 75,
    width: 63,
    marginLeft: -5,
  },
});
