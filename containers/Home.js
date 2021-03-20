import React from "react";
import Carousel from "../components/Carousel";
import HomeProducts from "../components/HomeProducts";
import HomeBanner from "../components/HomeBanner";
export default function Home() {
  return (
    <div style={{backgroundColor:"#e8b21e",height:"100vh"}} className="landing">
      <Carousel />
      <HomeProducts/>
      <HomeBanner />
    </div>
  );
}
