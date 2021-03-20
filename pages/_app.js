import {useEffect} from "react"
import "../styles/globals.css";
import axios from "axios"
import Navbar from "../components/Navbar";
import "semantic-ui-css/semantic.min.css";
import { GlobalProvider } from "../context/GlobalState";
import AuthCheck from "../components/AuthCheck"
function MyApp({ Component, pageProps }) {
  
  return (
    <div>
      <GlobalProvider>
        <AuthCheck/>
        <Navbar />

        <Component {...pageProps} />
      </GlobalProvider>
    </div>
  );
}

export default MyApp;
