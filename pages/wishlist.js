import React,{useEffect} from 'react'
import WishlistComp from "../components/WishlistComp";
import { useRouter } from "next/router"
import {useAppState} from "../context/GlobalState"
export default function Wishlist() {
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
            <WishlistComp/>
        </div>
    )
}
