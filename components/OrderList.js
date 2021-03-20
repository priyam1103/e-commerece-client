import React from "react";
import { useAppState } from "../context/GlobalState";
import { Icon } from "semantic-ui-react";
import Link from "next/link";
export default function OrderList() {
  const { user_data, updateUser } = useAppState();

  return (
    <>
      {user_data.orders && (
        <div className="shopping-cart">
          <div className="header">
            <p className="cart-title ">Your orders</p>
          </div>
          <div className="border"></div>
                  {user_data.orders.length != 0 ? <>
                      {user_data.orders.map((item) => (
                          <>
                              <div className="order-details">
                                  <p className="orderid">Order Id: {item.orderid}</p>
                                  <p className="ordervalue">Order value: {item.totalamount}</p>
                              </div>
                  
                              {item.order.map((item_, index) => (
                                  <div key={index}>
                                      <div className="user-product-cart">
                                          <div className="product">
                                              <img src={item_.image} />
                                              <div className="desc">
                                                  <Link
                                                      href={`/product/mobile/${item_.details_id}/${item_.id}/${item_.colour}/${item_.variant}/${item_.brand}`}
                                                  >
                                                      <p className="name">{item_.name}</p>
                                                  </Link>
                                                  <div className="tech-details">
                                                      <p className="variant">
                                                          <span className="title">Variant: </span>
                                                          <span>{item_.variant}</span>
                                                      </p>
                                                      <p className="colour">
                                                          <span className="title">Colour: </span>
                                                          <span>{item_.colour}</span>
                                                      </p>
                                                      <p className="brand">
                                                          <span className="title">Brand: </span>
                                                          <span>{item_.brand}</span>
                                                      </p>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                 
                                  </div>
                              ))}
                              <div className="border"></div>
                          </>
                      ))}</> :<p className="message-empty">No orders yet , <Link href="/">click here to shop.</Link></p>}
        </div>
      )}
    </>
  );
}
