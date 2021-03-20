import React from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import axios from "axios";
import { useAppState } from "../context/GlobalState";
export default function SignPrompt() {
  const { authenticateUser,authenticated ,logout} = useAppState();
  const responseGoogle = (response) => {
    axios
      .post("https://dusky-ecomm.herokuapp.com/api/user/auth", { response })
      .then((res) => {
        authenticateUser(res.data);
      })
      .catch((err) => alert("Error"));
  };
  return (
    <div className="signin-prompt-box">
      {authenticated ?
        <GoogleLogout
        clientId="811766296013-gf9ganrj4ntnro4tmu869rahln1k54od.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={logout}
      />:
        <GoogleLogin
          clientId="811766296013-gf9ganrj4ntnro4tmu869rahln1k54od.apps.googleusercontent.com"
          buttonText="Login with google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />}
    </div>
  );
}
