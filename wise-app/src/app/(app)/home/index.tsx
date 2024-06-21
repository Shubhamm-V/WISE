import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/src/components/layouts/Header";
import SloganCard from "@/src/components/cards/SloganCard";

type Props = {};

const Home = (props: Props) => {
  return (
    <SafeAreaView>
      <Header />
      <SloganCard />
    </SafeAreaView>
  );
};

export default Home;
