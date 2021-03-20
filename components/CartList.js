import React, { useEffect, useState } from "react";
import { useAppState } from "../context/GlobalState";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import Link from "next/link";
import { useRouter } from "next/router";
export default function CartList() {
  const { user_data, updateUser } = useAppState();
  const [totalamount, setTotalAmount] = useState(0);
  const router = useRouter();
  useEffect(() => {
    var amount = 0;
    if (user_data.cart) {
      for (var i = 0; i < user_data.cart.length; i++) {
        amount = amount + user_data.cart[i].quantity * user_data.cart[i].price;
      }
      setTotalAmount(amount);
    }
  }, [user_data]);
  async function updateQuantity(quantity, index) {
    const token = await localStorage.getItem("dusky-ecomm");

    await axios
      .post(
        "https://dusky-ecomm.herokuapp.com/api/user/work/updatequantity",
        { quantity: quantity, index: index },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        updateUser(res.data.user);
      });
  }
  async function deleteproductfromcart(index, pid) {
    const token = await localStorage.getItem("dusky-ecomm");

    await axios
      .post(
        "https://dusky-ecomm.herokuapp.com/api/user/work/deleteproductfromcart",
        { index: index, pid: pid },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        updateUser(res.data.user);
      });
  }
  const makePayment = async(token) => {
    const body = {
      token,
    };
    if (body.token) {
      const token_ = await localStorage.getItem("dusky-ecomm");
console.log(token_)
    await axios
      .post(
        "https://dusky-ecomm.herokuapp.com/api/user/work/buycart",{totalamount:totalamount} ,{
          headers: {
            Authorization: `Bearer ${token_}`,
          },
        }
      )
      .then((res) => {
        updateUser(res.data.user)
        router.push("/orders");
      })
      .catch((err) => {
        console.log(err.response)
      })
     
    }
  };
  return (
    <>
      {user_data.cart && (
        <>
          {user_data.cart.length != 0 ?
            <div className="shopping-cart">
              <div className="header">
                <p className="cart-title ">Shopping Cart</p>
                <div className="buy-option">
                  <p className="subtotal">
                    Subtotal ({user_data.cart.length} item) - ₹{totalamount}
                  </p>
                  <StripeCheckout
                    stripeKey="pk_test_51Gum0JFFnzmgGp3Po7ZMbCrIeAOgew8eb21Q6yus788P1afQ4U75SbtjkytiwkIh4UStqVgM7cSgzdTeiy3GXUzm0060gAjvfS"
                    token={makePayment}
                    name="Payment for duskify"
                    amount={totalamount}
                  >
                    <button>Proceed to buy</button>
                  </StripeCheckout>
                </div>
              </div>
              <div className="border"></div>

              {user_data.cart.map((item, index) => (
                <div key={index}>
                  <div className="user-product-cart">
                    <div className="product">
                      <img src={item.image} />
                      <div className="desc">
                        <Link
                          href={`/product/mobile/${item.details_id}/${item.id}/${item.colour}/${item.variant}/${item.brand}`}
                        >
                          <p className="name">{item.name}</p>
                        </Link>
                        <p className="msg">Eligible for FREE Shipping</p>
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
                          <div className="quantity">
                            <label for="qty">Quantity:</label>

                            <select
                              name="qty"
                              id="qty"
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(e.target.value, index)
                              }
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>

                            <span
                              onClick={() => deleteproductfromcart(index, item.id)}
                              className="delete-btn"
                            >
                              Delete
                        </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="prod-value">
                      <p>₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                  <div className="border"></div>
                </div>
              ))}
            </div>
            :<p className="message-empty">Your basket is empty , <Link href="/">click here to shop.</Link></p>}
         </>
      )}
    </>
  );
}
