import {
  LOGIN_USER,
  LOGOUT_USER,
  FETCH_USER,
  UPDATE_USER,
  USER_ERROR,
  REGISTER_USER,
} from "./constants";

const initialState = {
  user: null,
  authenticated: false,
  isAdmin: false,
  loading: true,
  error: null,
};
function UserReducer(state, action) {
  switch (action.type) {
    case LOGIN_USER:
    case FETCH_USER:
    case REGISTER_USER:
      return {
        ...state,
        authenticated: true,
        user: action.payload,
        loading: false,
        isAdmin: action.payload.role === "admin",
      };
    case UPDATE_USER:
      return { ...state, user: action.payload };
    case USER_ERROR:
      return { ...state, error: action.payload };
    case LOGOUT_USER:
      localStorage.removeItem("auth-token");
      return { ...state, authenticated: false, isAdmin: false, user: null };
    default:
      return state;
  }
}

export { initialState, UserReducer };
