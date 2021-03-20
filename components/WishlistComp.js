import React, { useState } from "react";
import { useAppState } from "../context/GlobalState";
import axios from "axios";
import { Icon } from "semantic-ui-react";
import Link from "next/link";
export default function WishlistComp() {
  const { user_data, updateUser } = useAppState();

  async function addtocartfromwishlist(pid, index) {
    const token = await localStorage.getItem("dusky-ecomm");

    await axios
      .post(
        "https://dusky-ecomm.herokuapp.com/api/user/work/addtocartfromwishlist",
        { pid: pid, index: index },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        updateUser(res.data.user);

        //router.push("/cart");
      });
  }
  async function removefromwishlist(pid, index) {
    const token = await localStorage.getItem("dusky-ecomm");
    await axios
      .post(
        "https://dusky-ecomm.herokuapp.com/api/user/work/removefromwishlist",
        { pid: pid, index: index },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        updateUser(res.data.user);

        //router.push("/cart");
      });
  }
  return (
    <>
      {user_data.wishlist && (
        <>
          {user_data.wishlist.length != 0 ? <>
            <div className="shopping-cart">
              <div className="header">
                <p className="cart-title ">Wishlist</p>
              </div>
              <div className="border"></div>

              {user_data.wishlist.map((item, index) => (
                <div key={index}>
                  <div className="user-product-cart">
                    <div className="product">
                      <img src={item.image} />
                      <div className="desc">
                        <Link href={`/product/mobile/${item.details_id}/${item.id}/${item.colour}/${item.variant}/${item.brand}`}>
                          <p className="name">{item.name}</p></Link>
                        <div className="tech-details">
                          <p className="variant">
                            <span className="title">Variant: </span>
                            <span>{item.variant}</span>
                          </p>
                          <p className="colour">
                            <span className="title">Colour: </span>
                            <span>{item.colour}</span>
                          </p>
                          <p className="brand">
                            <span className="title">Brand: </span>
                            <span>{item.brand}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="wishlist-btns">
                      <div className="cart-wishlist">
                        <button
                          className="cart-btn"
                          onClick={() => {
                            user_data.cartprodids.includes(parseInt(item.id))
                              ? null
                              : addtocartfromwishlist(item.id, index);
                          }}
                        >
                          {user_data.cartprodids && (
                            <p>
                              <Icon name="shopping cart" />
                              {user_data.cartprodids.includes(parseInt(item.id))
                                ? "In Cart"
                                : "Add to Cart"}
                            </p>
                          )}
                        </button>
                        <button
                          className="cart-btn"
                          onClick={() => removefromwishlist(item.id, index)}
                        >
                          <p>
                            {" "}
                            <Icon name="heart" /> Remove from Wishlist
                      </p>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="border"></div>
                </div>
              ))}
            </div>
          </> :<p className="message-empty">You list is empty , <Link href="/">click here to view products.</Link></p>}
          </>
      )}
    </>
  );
}
