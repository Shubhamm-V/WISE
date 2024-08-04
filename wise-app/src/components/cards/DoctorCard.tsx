import { StyleSheet, View, Image, Linking } from "react-native";
import React from "react";
import { COLORS } from "@/src/constants/colors";
import CustomText from "../custom-widgets/CustomText";
import CustomButton from "../custom-widgets/CustomButton";
const DoctorCard = () => {
  const handleOpenHospital = () => {
    Linking.openURL("https://wisefordoctors.netlify.app").catch((err) =>
      console.error("Error opening link:", err)
    );
  };
  return (
    <View style={styles.card}>
      <View
        style={{
          width: "40%",
          justifyContent: "flex-start",
        }}
      >
        <Image
          style={styles.image}
          source={require("../../../assets/images/illustrations/hospitals/doctor.png")}
        />
      </View>
      <View style={{ width: "60%" }}>
        <CustomText
          label="Are you a doctor?"
          customStyle={{
            fontSize: 15,
            color: COLORS.primary,
            fontFamily: "DMSansBold",
          }}
        />
        <CustomText
          label="Register your hospital now and connect with local patients."
          customStyle={styles.slogan}
        />
        <View style={{ alignItems: "center" }}>
          <CustomButton
            label="Register your hospital"
            onPress={handleOpenHospital}
            customStyle={{ margin: 5, padding: 7, width: "100%" }}
          />
        </View>
      </View>
    </View>
  );
};

export default DoctorCard;

const styles = StyleSheet.create({
  card: {
    padding: 13,
    elevation: 1,
    marginVertical: 10,
    marginHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#F3ECFB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    height: 110,
    width: 105,
    marginLeft: 2,
  },
  slogan: {
    fontSize: 13,
    paddingVertical: 8,
    fontFamily: "DMSansItalic",
    color: COLORS.dark,
  },
});
