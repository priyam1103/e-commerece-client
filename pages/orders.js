import React,{useEffect} from 'react'
import OrderList from "../components/OrderList";
import { useRouter } from "next/router"
import {useAppState} from "../context/GlobalState"
export default function Orders() {
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
        <div style={{paddingTop:"10rem"}}>
            <OrderList/>
        </div>
    )
}
