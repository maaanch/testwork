import PropTypes from "prop-types";
import { createContext, useEffect, useReducer } from "react";

// third-party

import jwtDecode from "jwt-decode";

// reducer - state management
import { LOGIN, LOGOUT } from "../reducers/actions";
import accountReducer from "../reducers/accountReducer";
import axios from "../api/axios";
import Axios from "axios";
// constant
const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  loading: true,
  user: null,
};

const verifyToken = (accessToken: any) => {
  if (!accessToken) {
    return false;
  }
  // const decoded = jwtDecode(accessToken);
  // console.log('==============decoded token==================');
  // console.log(decoded);
  // console.log('=============================================');
  /**
   * Property 'exp' does not exist on type '<T = unknown>(token, options?: JwtDecodeOptions | undefined) => T'.
   */
  // return decoded.exp > Date.now() / 1000;
};

const getaccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken ? accessToken : null;
};

const setSession = (
  accessToken: string | null,
  profile: { id: any; role: any } | null | undefined
) => {
  if (accessToken) {
    console.log("accestoken find");

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("profile", JSON.stringify(profile));
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    console.log("accestoken Not find");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("profile");
    localStorage.clear();
    delete axios.defaults.headers.common.Authorization;
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const JWTContext = createContext<JWTContextType | null>(null);
export const JWTProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const profile = JSON.parse(localStorage.getItem("profile")!);

        if (accessToken) {
          setSession(accessToken, profile);
          console.log("accestoken find in useefftect");
          const { id, role } = profile;
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              loading: false,
              user: {
                id,
                role,
              },
            },
          });
        } else {
          console.log("accestoken Not find in useefftect");
          setSession(null, null);
          dispatch({
            type: LOGOUT,
            payload: {
              user: undefined,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: LOGOUT,
          payload: {
            user: undefined,
          },
        });
      }
    };

    init();
  }, []);

  // eslint-disable-next-line consistent-return
  const login = async (email: any, password: any) => {
    try {
      const res = await axios.post("/auth/login", { email, password });
      console.log(res.data);
      const profile = { id: res.data.profile.id, role: res.data.profile.role };
      setSession(res.data.accessToken, profile);
      const { id, role } = profile;
      dispatch({
        type: LOGIN,
        payload: {
          isLoggedIn: true,
          user: {
            id,
            role,
          },
        },
      });
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    setSession(null, null);
    dispatch({
      type: LOGOUT,
      payload: {
        user: undefined,
      },
    });
  };
  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    // todo: this flow need to be recode as it not verified
    try {
      const { data, status, statusText } = await axios.post("/auth/signup", {
        email,
        password,
        firstName,
        lastName,
      });

      return { success: true, status, message: statusText, data };
    } catch (e) {
      if (Axios.isAxiosError(e)) {
        if (e.response) {
          const { statusCode, message } = e.response.data;
          return {
            success: false,
            status: statusCode,
            message,
          };
        }
      }

      return {
        success: false,
        status: 500,
        message: "error occuered",
      };
    }
  };
  const forgetPassword = async (email: any) => {
    const response = await axios.post("/auth/forget", {
      email,
    });

    console.log(response);
    return response.data;
  };

  const resetPassword = async (email: any, token: any, password: any) => {
    try {
      const response = await axios.post("/auth/resetpassword", {
        email,
        token,
        password,
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <JWTContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
        getaccessToken,
        resetPassword,
        forgetPassword,
      }}
    >
      {children}
    </JWTContext.Provider>
  );
};

JWTProvider.propTypes = {
  children: PropTypes.node,
};

export default JWTContext;

export type JWTContextType = {
  // user?: Profile | null | undefined;
  isLoggedIn: boolean;
  loading: boolean;
  logout: () => void;
  getaccessToken: () => string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,

    termsAccepted: boolean
  ) => Promise<any>;
  resetPassword: (email: any, token: any, password: any) => Promise<void>;
  forgetPassword: (email: any) => Promise<any>;
};
