import Banner from "./components/Banner/index";
import Features from "./components/Features/index";
import Register from "./components/Register/index";
import Overview from "./components/Overview/index";
import FAQ from "./components/FAQ/index";

export default function Home() {
  return (
    <main>
      <Banner />
      <Features />
      <Register />
      <Overview />
      <FAQ />
    </main>
  );
}
