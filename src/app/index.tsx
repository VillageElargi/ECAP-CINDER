import HomeScreen from "@/components/home-screen";
import Swiper from "@/components/swiper.tsx";
import { useState } from "react";

export default function App() {
  const [isOnMainPage, setIsOnMainPage] = useState(false);

  if (!isOnMainPage) {
    return <HomeScreen setIsOnMainPage={setIsOnMainPage} />;
  }

  return <Swiper />;
}
