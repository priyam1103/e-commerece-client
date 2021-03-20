import React,{useEffect} from "react";
import CartList from "../components/CartList";
import { useRouter } from "next/router"
import { useAppState } from "../context/GlobalState";
export default function cart() {
  
  const router = useRouter();
  const {promptsignin } = useAppState();
  useEffect(() => {
      const token = localStorage.getItem("dusky-ecomm");
      if(token === null){
          router.push("/");
          promptsignin()
      }
  },[])
  return (
    <div style={{ paddingTop: "9rem" }}>
  <CartList/>
    </div>
  );
}
