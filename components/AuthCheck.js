import React, { useEffect ,useState} from "react";
import { useAppState } from "../context/GlobalState";
import axios from "axios";
import Loader from "./Loader";
import Backdrop from "./Backdrop";
export default function AuthCheck() {
  const { authenticateUser } = useAppState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function authCheck() {
      setLoading(true)
      const token = await localStorage.getItem("dusky-ecomm");

      if (token) {
        axios
          .get("https://dusky-ecomm.herokuapp.com/api/user/authcheck", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setLoading(false)
            authenticateUser(res.data);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false)
            alert("error");
          });
      } else {
        setLoading(false)
      }
    }
    authCheck();
  }, []);
  return <div>
    {loading && <><Backdrop/><Loader/></>}
  </div>;
}
