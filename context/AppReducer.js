export default (state, action) => {
  switch (action.type) {
    case "SIGNIN_PROMPT":
      return {
        ...state,
        showsigninprompt: !state.showsigninprompt,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user_data: action.payload,
      };
    case "LOGOUT": {
      return {
        ...state,
        user_data: {},
        authenticated: false,
        showsigninprompt:false,
      }
    }
    case "ADD_USER_DETAILS":
      return {
        ...state,
        user_data: action.payload,
        showsigninprompt: false,
        authenticated: true,
      };
    default:
      return;
  }
};
