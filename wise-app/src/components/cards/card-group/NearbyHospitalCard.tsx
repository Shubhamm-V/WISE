import { StyleSheet, View, Image, Linking, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "@/src/constants/colors";
import CustomText from "../../custom-widgets/CustomText";
import { router } from "expo-router";
const NearbyHospitalCard = () => {
  return (
    <LinearGradient
      colors={["#F1ECF6", COLORS.lightPrimary]}
      style={[styles.gradient, styles.card]}
    >
      <View style={{ width: "70%" }}>
        <CustomText
          label="Quick access to nearby hospitals"
          customStyle={styles.description}
        />
        <Pressable
          style={{
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
          }}
          onPress={() => router.push("/hospitals")}
        >
          <CustomText
            label="Nearby Hospitals"
            customStyle={{
              fontSize: 15,
              color: COLORS.primary,
              fontFamily: "DMSansBold",
            }}
          />
          <Icon
            name="arrow-forward-outline"
            size={20}
            color={COLORS.primary}
            style={{ textAlign: "left", paddingBottom: 0 }}
          />
        </Pressable>
      </View>
      <View>
        <Image
          style={styles.image}
          source={require("../../../../assets/images/illustrations/hospitals/nearby.png")}
        />
      </View>
    </LinearGradient>
  );
};

export default NearbyHospitalCard;

const styles = StyleSheet.create({
  card: {
    elevation: 1,
    marginHorizontal: 12,
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: "#F3ECFB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
  },
  image: {
    height: 90,
    width: 95,
  },
  description: {
    fontSize: 13,
    paddingVertical: 8,
    marginTop: -20,
    // fontFamily: "DMSansItalic",
    color: COLORS.title,
  },
  gradient: {
    paddingHorizontal: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
    borderRadius: 5,
  },
});
