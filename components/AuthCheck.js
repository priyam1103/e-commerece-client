import React, { useEffect } from "react";
import { useAppState } from "../context/GlobalState";
import axios from "axios";
export default function AuthCheck() {
  const { authenticateUser } = useAppState();
  useEffect(() => {
    async function authCheck() {
      const token = await localStorage.getItem("dusky-ecomm");

      if (token) {
        axios
          .get("https://dusky-ecomm.herokuapp.com/api/user/authcheck", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            authenticateUser(res.data);
          })
          .catch((err) => {
            console.log(err);
            alert("error");
          });
      }
    }
    authCheck();
  }, []);
  return <div></div>;
}
