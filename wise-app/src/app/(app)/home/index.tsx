import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/src/components/layouts/Header";
import SloganCard from "@/src/components/cards/SloganCard";
import TrackCards from "@/src/components/cards/TrackCards";
import CircularChart from "@/src/components/charts/CircularChart";
import { ScrollView } from "react-native";
import Dropdown from "@/src/components/custom-widgets/Dropdown";

type Props = {};

const Home = (props: Props) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Header />
        <SloganCard />
        <CircularChart />
        <TrackCards />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
