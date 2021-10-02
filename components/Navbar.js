import React from "react";
import { Icon } from "semantic-ui-react";
import Link from "next/link";
import { useAppState } from "../context/GlobalState";
import Backdrop from "./Backdrop";
import SignPrompt from "./SignPrompt";
export default function Navbar() {
  const {
    showsigninprompt,
    promptsignin,
    user_data,
    authenticated,
  } = useAppState();
  console.log(showsigninprompt);
  return (
    <>
      <div className="navbar">
        <div className="one">
        <div className="brand">
         
          <p className="brandname">
            <Link href="/">Duskify</Link>
          </p>
        </div>
        {authenticated ? (
          <div onClick={() => promptsignin()} className="userdetails">
            <span>Hello,</span>
            <span className="account"> {user_data.username}</span>
          </div>
        ) : (
          <div onClick={() => promptsignin()} className="userdetails">
            <p>
              Hello, <span className="account"> Sign in</span>
            </p>
          </div>
          )}
          </div>
        {authenticated && (
          <div className="two">
            <Link href="/wishlist">
              <p>
                <Icon name="heart" /> Wishlist
              </p>
            </Link>

            <Link href="/orders">
            <p>
                <Icon name="ordered list" /> Orders
              </p>
            </Link>

            <Link href="/cart">
              <div className="cart">
                <Icon name="shopping cart" className="large" />
                {user_data.cart ? (
                  <span>{user_data.cart.length}</span>
                ) : (
                  <span>0</span>
                )}
              </div>
            </Link>
          </div>
        )}
      </div>

      {showsigninprompt && (
        <>
          <Backdrop />
          <SignPrompt promptsignin={promptsignin}/>
        </>
      )}
    </>
  );
}
