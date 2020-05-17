import * as actionTypes from "../actions/actionTypes";
import { uObject } from "../utility";

const iState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/",
};

const authStart = (state, action) => {
  return uObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return uObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false,
  });
};

const authFail = (state, action) => {
  return uObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state, action) => {
  return uObject(state, { token: null, userId: null });
};

const setAuthRedirect = (state, action) => {
  return uObject(state, { authRedirectPath: action.path });
};

const reducer = (state = iState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_STARTS:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAILED:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.SET_AUTH_REDIRECT:
      return setAuthRedirect(state, action);
    default:
      return state;
  }
};

export default reducer;
