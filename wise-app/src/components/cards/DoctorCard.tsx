import { StyleSheet, View, Image, Linking } from "react-native";
import React from "react";
import { COLORS } from "@/src/constants/colors";
import CustomText from "../custom-widgets/CustomText";
import CustomButton from "../custom-widgets/CustomButton";
const DoctorCard = () => {
  const handleOpenHospital = () => {
    Linking.openURL("https://app.wisewomenhealth.in").catch((err) =>
      console.error("Error opening link:", err)
    );
  };
  return (
    <>
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
            label="Register nearby hospital"
            customStyle={{
              fontSize: 15,
              color: COLORS.primary,
              fontFamily: "DMSansBold",
            }}
          />
          <CustomText
            label="Register nearby hospital and help others in emergency"
            customStyle={styles.slogan}
          />
          <View style={{ alignItems: "center" }}>
            <CustomButton
              label="Register hospital"
              onPress={handleOpenHospital}
              customStyle={{ margin: 5, padding: 7, width: "100%" }}
            />
          </View>
        </View>
      </View>
      <View style={{ alignItems: "center", marginVertical: 20 }}>
        <CustomText
          label="from"
          customStyle={{
            fontSize: 16,
            color: COLORS.primary,
          }}
        />
        <Image
          style={styles.developersImage}
          source={require("../../../assets/images/illustrations/education/developers.png")}
        />
      </View>
    </>
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
  developersImage: {
    width: 300,
    height: 50,
  },
});
