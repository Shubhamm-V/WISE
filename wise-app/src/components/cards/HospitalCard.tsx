import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Divider } from "@rneui/base";
import { COLORS } from "@/src/constants/colors";
import CustomText from "../custom-widgets/CustomText";
import { Hospital } from "@/src/app/(app)/hospitals";

interface ChildProps {
  hospitalData: Hospital;
}

const HospitalCard: React.FC<ChildProps> = ({ hospitalData }) => {
  const { name, address, contact, distance, coordinates, doctor } =
    hospitalData;
  return (
    <View style={styles.cardContainer}>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <Image
          style={styles.image}
          source={require("../../../assets/images/illustrations/hospitals/hospital.png")}
        />
        <View style={styles.cardContent}>
          <CustomText label={name} customStyle={styles.nameText} />
        </View>
      </View>

      <Divider />
      <View style={styles.hospitalLabel}>
        <CustomText label="Address" customStyle={styles.infoLabel} />
        <CustomText label={address} customStyle={styles.infoText} />
      </View>

      <Divider />
      <View style={styles.hospitalLabel}>
        <CustomText label="Doctor Name" customStyle={styles.infoLabel} />
        <CustomText label={doctor} customStyle={styles.infoText} />
      </View>
      <Divider />

      <View style={styles.hospitalLabel}>
        <CustomText label="Contact No." customStyle={styles.infoLabel} />
        <CustomText label={contact} customStyle={styles.infoText} />
      </View>
      <Divider />
      <View style={styles.hospitalLabel}>
        <CustomText label="Distance" customStyle={styles.infoLabel} />
        <CustomText label={distance} customStyle={styles.infoText} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.light,
    borderRadius: 4,
    paddingVertical: 20,
    paddingHorizontal: 6,
    marginVertical: 0,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    shadowRadius: 0.84,
    shadowOpacity: 0.15,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    shadowColor: "#52006A",
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
  hospitalLabel: {
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
  image: {
    height: 50,
    width: 50,
  },
});

export default HospitalCard;
