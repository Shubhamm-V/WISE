import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/src/components/layouts/Header";
import SloganCard from "@/src/components/cards/SloganCard";
import EducationCards from "@/src/components/cards/card-group/EducationCards";
import CircularChart from "@/src/components/charts/CircularChart";
import { ScrollView, Text } from "react-native";
import { useAuth } from "@/src/context/authContext";
import Loading from "@/src/components/custom-widgets/Loading";
import { COLORS } from "@/src/constants/colors";
import TrackCards from "@/src/components/cards/card-group/TrackCards";
import DoctorCard from "@/src/components/cards/DoctorCard";
type Props = {};

const Home = (props: Props) => {
  const { user } = useAuth();
  if (!user || user.name == undefined) return <Loading />;

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.light }}>
      <ScrollView>
        <Header />
        <SloganCard />
        {/* <CircularChart /> */}
        <TrackCards />
        <EducationCards />
        <DoctorCard />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
