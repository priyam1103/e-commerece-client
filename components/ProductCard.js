import React from "react";
import Link from "next/link";
export default function ProductCard({ data }) {
  return (
    <div className="products-grid-main">
      {data.map((item, index) => (
        <div key={index}>
        <Link
          href={`/product/mobile/${item.details_id}/${item.id}/${item.colour}/${item.variant}/${item.brand}`}
        >
          <div className="products-card">
            <img src={item.image} />
            <div className="item-data">
              <p className="name">
                {item.name} - {item.ram}GB RAM - {item.internal_memory}GB
                Storage
              </p>
              <p>by {item.brand}</p>
              <p className="cost">
                ₹<span className="price">{item.price}</span>00
                {item.mrp != null && (
                  <span className="mrp">₹{item.mrp}.00</span>
                )}
                <span className="message">FREE Delivery</span>
              </p>
            </div>
          </div>
          </Link>
          
          </div>
      ))}
    </div>
  );
}
