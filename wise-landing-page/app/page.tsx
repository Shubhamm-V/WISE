import Banner from "./components/Banner/index";
import Aboutus from "./components/Aboutus/index";

import Beliefs from "./components/Beliefs/index";

import Featured from "./components/Featured/index";
import FAQ from "./components/FAQ/index";

export default function Home() {
  return (
    <main>
      <Banner />
      <Aboutus />
      <Beliefs />
      <Featured />
      <FAQ />
    </main>
  );
}
