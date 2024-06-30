import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import HospitalCard from "@/src/components/cards/HospitalCard";
import { DUMMY_HOSPITALS } from "@/src/constants/dummy";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "@/src/constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/src/components/custom-widgets/CustomText";

export interface Hospital {
  name: string;
  doctor: string;
  address: string;
  distance: string;
  coordinates: { lat: number; lang: number };
  contact: string;
  uid: string;
}

type Props = {};
const NearByHospitals = (props: Props) => {
  const [allHospitals, setallHospitals] = useState<Hospital[]>([]);
  const [tempAllHospitals, settempAllHospitals] = useState<Hospital[]>([]);

  useEffect(() => {
    setallHospitals(DUMMY_HOSPITALS);
    settempAllHospitals(DUMMY_HOSPITALS);
  }, []);

  const filterResults = (value: string) => {
    value = value.toLowerCase();
    const data = tempAllHospitals.filter((hospital: any) => {
      return (
        hospital.name.toLowerCase().includes(value) ||
        hospital.doctor.toLowerCase().includes(value) ||
        hospital.address.toLowerCase().includes(value)
      );
    });
    setallHospitals(data);
  };
  return (
    <SafeAreaView style={{ marginHorizontal: "2.3%" }}>
      <CustomText
        label="Neareby Hospitals"
        customStyle={{ fontSize: 23, fontFamily: "DMSansBold", marginTop: 20 }}
      />
      <View style={styles.searchInput}>
        <Icon
          name="search"
          size={20}
          color="#364F6B"
          style={{ paddingVertical: 5, paddingHorizontal: 10 }}
        />
        <TextInput
          placeholder="Search by hospital name, address, doctor, etc."
          onChangeText={(value: string) => filterResults(value)}
          placeholderTextColor={COLORS.dark}
          style={{ flex: 1, paddingVertical: 0, color: "#364F6B" }}
        />
      </View>
      {allHospitals && allHospitals.length > 0 && (
        <View>
          <View>
            {allHospitals.length > 0 && (
              <FlatList
                data={allHospitals}
                keyExtractor={(item) => item?.uid} // You can use a unique key here
                renderItem={({ item }) => {
                  return <HospitalCard hospitalData={item} />;
                }}
              />
            )}
          </View>
        </View>
      )}

      {allHospitals.length == 0 && (
        <View
          style={{
            height: "80%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ height: 200, width: 200 }}
            source={require("../../../../assets/images/illustrations/hospitals/finding-hospital.png")}
          />
          <View style={{ width: "80%" }}>
            <CustomText
              customStyle={{ textAlign: "center" }}
              label="Sorry..! No nearby hospitals are registered on our App"
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default NearByHospitals;

const styles = StyleSheet.create({
  searchInput: {
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 20,
    marginBottom: 5,
    borderBottomWidth: 1,
    flexDirection: "row",
    borderBottomColor: "#ccc",
    backgroundColor: "#fbfbfb",
  },
});
