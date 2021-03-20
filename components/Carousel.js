import React from "react";

const data = [
  "https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Itel/ItelA47/GW/Shopnow/D20530479_WLD_Itel_A47_Launch_DesktopTallHero_1500x600._CB661542373_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Xiaomi/RedmiNote9/GW/March/Updated/D21559520_WLD_Mi_Redmi_Note9_DesktopTallHero_1500x600._CB656486097_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img20/Events/holi21/GW/rev/Holi-GW-Hero-PC-1x._CB658320183_.jpg",
];
export default function Carousel() {
  return (
    <div className="carousel">
      {data.map((item) => (
        <img src={item} />
      ))}
    </div>
  );
}
