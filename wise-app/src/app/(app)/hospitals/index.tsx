import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import GetLocation from "react-native-get-location";
import HospitalCard from "@/src/components/cards/HospitalCard";
import { getDocs, collection } from "firebase/firestore";
import Icon from "react-native-vector-icons/Ionicons";
import { db } from "@/firebaseConfig";
import { COLORS } from "@/src/constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/src/components/custom-widgets/CustomText";
import { DISTANCE } from "@/src/constants/dropdown";
import Dropdown from "@/src/components/custom-widgets/Dropdown";

type Hospital = {
  id: string;
  hospitalName: string;
  doctorName: string;
  address: string;
  latitude: string;
  longitude: string;
  position?: boolean;
  city: string;
  state: string;
  contact: string;
};

type Props = {};
const NearByHospitals = (props: Props) => {
  const [allHospitals, setallHospitals] = useState<Hospital[]>([]);
  const [tempAllHospitals, settempAllHospitals] = useState<Hospital[]>([]);

  useEffect(() => {
    const getInfo = async () => {
      const querySnapshot = await getDocs(collection(db, "hospitals"));
      const allHospitalData: Hospital[] = [];

      querySnapshot.forEach((doc) => {
        let data = doc.data();
        allHospitalData.push({
          id: doc.id,
          hospitalName: data?.hospitalName,
          doctorName: data?.doctorName,
          address: data?.address,
          latitude: data?.latitude,
          longitude: data?.longitude,
          position: data?.position,
          city: data?.city,
          state: data?.state,
          contact: data?.contact,
        });
      });
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      })
        .then((location) => {
          console.log(location);
        })
        .catch((error) => {
          const { code, message } = error;
          console.warn(code, message);
        });
      setallHospitals(allHospitalData);
      settempAllHospitals(allHospitalData);
    };

    getInfo();
  }, []);

  const filterResults = (value: string) => {
    value = value.toLowerCase();
    const data = tempAllHospitals.filter((hospital: any) => {
      return (
        hospital.hospitalName.toLowerCase().includes(value) ||
        hospital.doctorName.toLowerCase().includes(value) ||
        hospital.address.toLowerCase().includes(value)
      );
    });
    setallHospitals(data);
  };

  const handleDistanceSelect = () => {};
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.light,
      }}
    >
      <View style={{ paddingHorizontal: "2%", flex: 1 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <CustomText label="Neareby Hospitals" customStyle={styles.header} />
          <View style={styles.dropdown}>
            <Dropdown
              options={DISTANCE}
              onSelect={handleDistanceSelect}
              placeholder="25 KM"
              isEditing={true}
              height={27}
            />
          </View>
        </View>
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
          <View style={{ flex: 1 }}>
            <View>
              {allHospitals.length > 0 && (
                <FlatList
                  data={allHospitals}
                  contentContainerStyle={{ paddingBottom: 5 }}
                  keyExtractor={(item) => item?.id} // You can use a unique key here
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
            {/* <Image
              style={{ height: 200, width: 200 }}
              source={require("../../../../assets/images/illustrations/hospitals/finding-hospital.png")}
            /> */}
            <View style={{ width: "80%" }}>
              <CustomText
                customStyle={{ textAlign: "center" }}
                label="Sorry..! No nearby hospitals are registered on our App"
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default NearByHospitals;

const styles = StyleSheet.create({
  searchInput: {
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 5,
    borderBottomWidth: 1,
    flexDirection: "row",
    borderBottomColor: "#ccc",
    backgroundColor: "#fbfbfb",
  },
  dropdown: {
    width: "32%",
    borderWidth: 1,
    marginTop: 15,
    borderRadius: 5,
    borderColor: COLORS.dark700,
  },
  header: {
    fontSize: 23,
    fontFamily: "DMSansBold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
});
