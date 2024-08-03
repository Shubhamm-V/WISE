import React, { Dispatch, SetStateAction, useState } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Divider } from "@rneui/base";
import { COLORS } from "@/src/constants/colors";
import CustomText from "../custom-widgets/CustomText";
import { Hospital } from "@/src/app/(app)/hospitals";
import WebView from "react-native-webview";
interface ChildProps {
  hospitalData: Hospital;
}

const HospitalCard: React.FC<ChildProps> = ({ hospitalData }) => {
  const { hospitalName, address, contact, doctorName, distance } = hospitalData;
  const [isMapOpen, setIsMapOpen] = useState(false);
  return (
    <View style={styles.cardContainer}>
      <View
        style={{
          flexDirection: "row",
          gap: 3,
          padding: 5,
        }}
      >
        <View
          style={{
            borderWidth: 1,
            borderColor: COLORS.primary,
            borderRadius: 10,
          }}
        >
          <Image
            style={styles.image}
            source={require("../../../assets/images/illustrations/hospitals/hospital.png")}
          />
        </View>
        <View style={styles.cardContent}>
          <CustomText label={hospitalName} customStyle={styles.nameText} />
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
        <CustomText label={doctorName} customStyle={styles.infoText} />
      </View>
      <Divider />

      <View style={styles.hospitalLabel}>
        <CustomText label="Contact No." customStyle={styles.infoLabel} />
        <CustomText label={contact} customStyle={styles.infoText} />
      </View>
      <Divider />
      <View style={styles.hospitalLabel}>
        <CustomText label="Distance" customStyle={styles.infoLabel} />
        <CustomText label={distance || ""} customStyle={styles.infoText} />
      </View>
      <Divider />

      <Pressable
        style={{ paddingHorizontal: 10, alignItems: "flex-end" }}
        onPress={() => {
          setIsMapOpen((prev) => !prev);
        }}
      >
        <View style={styles.mapHeader}>
          <CustomText
            label={isMapOpen ? "Close Map" : "Open Map"}
            customStyle={styles.mapLabel}
          />
          <Icon
            name={isMapOpen ? "chevron-up-outline" : "chevron-down-outline"}
            color={COLORS.primary}
            size={19}
            style={{ marginTop: 5 }}
          />
        </View>
      </Pressable>
      {isMapOpen && (
        <WebView
          containerStyle={{
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 5,
            marginTop: 10,
          }}
          source={{
            html: `<div style="width: 100%; overflow="hidden; height: '100%;" >
              <iframe height='150%' width="100%" style="border:0;"  src = "https://maps.google.com/maps?q=${hospitalData.latitude},${hospitalData.longitude}&hl=es;z=25&amp;output=embed">
              </iframe>
            </div>
            `,
          }}
          style={styles.map}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.light,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 6,
    marginVertical: 2,
    elevation: 1,
    borderColor: "lightgray",
    borderWidth: 1,
    shadowColor: "#52006A",
  },

  cardContent: {
    display: "flex",
    justifyContent: "center",
    marginLeft: 7,
    width: "100%",
  },
  nameText: {
    fontSize: 17,
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
    fontSize: 13,
    color: COLORS.dark,
    width: "55%",
    fontFamily: "DMSansSemiBold",
  },
  infoLabel: {
    fontSize: 13,
    color: COLORS.dark,
    width: "45%",
  },
  image: {
    height: 24,
    width: 24,
  },
  mapLabel: {
    textAlign: "center",
    color: COLORS.primary,
    paddingTop: 5,
  },
  mapHeader: {
    flexDirection: "row",
    gap: 3,
    justifyContent: "flex-end",
  },
  map: {
    width: "100%",
    height: 250,
    borderRadius: 10,
  },
});

export default HospitalCard;
