import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Divider } from "@rneui/base";
import { COLORS } from "@/src/constants/colors";
import CustomText from "../custom-widgets/CustomText";
const HospitalCard = (props: any) => {
  const rideData = {
    name: "Sigma Hospital",
    email: "ram@gmail.com",
    from: "Somwhere",
    timeLabel: "200",
    to: "something",
    gender: "female",
    vehicle: "tvs",
    phone: "9090443433",
    dorLabel: "43433",
    category: "203",
    amount: 20,
  };
  const { name } = rideData;
  return (
    <View style={styles.cardContainer}>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <Image
          source={require("../../../assets/images/illustrations/slogan-women.png")}
          style={styles.hospitalImage}
        />
        <View style={styles.cardContent}>
          <CustomText label={name} customStyle={styles.nameText} />
        </View>
      </View>

      <Divider />
      <View style={styles.contactHeader}>
        <CustomText label="Address" customStyle={styles.infoLabel} />
        <CustomText label="Child Hospital" customStyle={styles.infoText} />
      </View>
      <Divider />
      <View style={styles.contactHeader}>
        <CustomText label="Category" customStyle={styles.infoLabel} />
        <CustomText
          label="Darga Road, Front of DMart, Aurangabad"
          customStyle={styles.infoText}
        />
      </View>
      <Divider />
      <View style={styles.contactHeader}>
        <CustomText label="Doctor Name" customStyle={styles.infoLabel} />
        <CustomText label="Dr. Sunil Kuyare" customStyle={styles.infoText} />
      </View>
      <Divider />

      <View style={styles.contactHeader}>
        <CustomText label="Contact No." customStyle={styles.infoLabel} />
        <CustomText label="80803434343" customStyle={styles.infoText} />
      </View>
      <Divider />
      <View style={styles.contactHeader}>
        <CustomText label="Distance" customStyle={styles.infoLabel} />
        <CustomText label="1 KM" customStyle={styles.infoText} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.light,
    marginHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 6,
    marginVertical: 8,
    marginLeft: "1.8%",
    marginRight: "1.8%",
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    shadowRadius: 0.84,
    shadowOpacity: 0.15,
    shadowColor: "#52006A",
    marginTop: 100,
  },

  hospitalImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
  },

  cardContent: {
    display: "flex",
    justifyContent: "center",
    marginLeft: 7,
    width: "100%",
  },
  nameText: {
    fontSize: 20,
    color: COLORS.primary,
    fontFamily: "DMSansBold",
  },
  contactHeader: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoText: {
    fontSize: 15,
    color: COLORS.dark,
    width: "55%",
    fontFamily: "DMSansSemiBold",
  },
  infoLabel: {
    fontSize: 15,
    color: COLORS.dark,
    width: "45%",
  },
});

export default HospitalCard;
