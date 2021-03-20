import { createContext, useReducer, useContext } from "react";
import AppReducer from "./AppReducer";
const initial_data = {
  showsigninprompt: false,
  user_data: {},
  authenticated: false,
};

export const GlobalContext = createContext(initial_data);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initial_data);
  function promptsignin() {
    dispatch({
      type: "SIGNIN_PROMPT",
    });
  }
  function authenticateUser(value) {
    localStorage.setItem("dusky-ecomm", value.token);
    dispatch({
      type: "ADD_USER_DETAILS",
      payload: value.user,
    });
  }
  function logout() {
    localStorage.removeItem("dusky-ecomm");
    dispatch({
      type: "LOGOUT",
    });
  }
  function updateUser(value) {
    dispatch({
      type: "UPDATE_USER",
      payload: value,
    });
  }
  return (
    <GlobalContext.Provider
      value={{
        showsigninprompt: state.showsigninprompt,
        user_data: state.user_data,
        authenticated: state.authenticated,
        promptsignin,
        updateUser,
        authenticateUser,
        logout
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export function useAppState() {
  return useContext(GlobalContext);
}
