import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HospitalCard from "@/src/components/cards/HospitalCard";

type Props = {};

const NearByHospitals = (props: Props) => {
  return (
    <View>
      <HospitalCard />
    </View>
  );
};

export default NearByHospitals;

const styles = StyleSheet.create({});
