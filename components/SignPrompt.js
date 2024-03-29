import React from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import axios from "axios";
import { useAppState } from "../context/GlobalState";
export default function SignPrompt({promptsignin}) {
  const { authenticateUser,authenticated ,logout} = useAppState();
  const responseGoogle = (response) => {
    axios
      .post("https://dusky-ecomm.herokuapp.com/api/user/auth", { response })
      .then((res) => {
        authenticateUser(res.data);
      })
      .catch((err) => alert("To continue , Please Allow cookies in your browser ,Advanced->SiteSettings->cookies, and then try again."));
  };
  return (
    
    <div className="signin-prompt-box">
      {authenticated ?
        <GoogleLogout
        clientId="811766296013-snhjrcc3at10kpmou6c7hseeh2dfgmsf.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={logout}
      />:
        <GoogleLogin
          clientId="811766296013-snhjrcc3at10kpmou6c7hseeh2dfgmsf.apps.googleusercontent.com"
          buttonText="Login with google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          prompt='consent'
        />}
      <p onClick={()=>promptsignin()}>Close</p>
      </div>
      
  );
}
