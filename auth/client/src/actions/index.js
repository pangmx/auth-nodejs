import { AUTH_USER, AUTH_ERROR } from "./types";
import axios from "axios";

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      "http://localhost:3090/signup",
      formProps
    );
    dispatch({
      type: AUTH_USER,
      payload: response.data.token
    });

    // save token to localStorage to persist the login between page refresh
    localStorage.setItem("token", response.data.token);
    callback();
  } catch (e) {
    dispatch({
      type: AUTH_ERROR,
      payload: "Email is in use"
    });
  }
};

export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      "http://localhost:3090/signin",
      formProps
    );
    dispatch({
      type: AUTH_USER,
      payload: response.data.token
    });

    // save token to localStorage to persist the login between page refresh
    localStorage.setItem("token", response.data.token);
    callback();
  } catch (e) {
    dispatch({
      type: AUTH_ERROR,
      payload: "Invalid credentials"
    });
  }
};

export const signout = () => {
  // clear the token from localStorage
  localStorage.removeItem("token");

  return { type: AUTH_USER, payload: "" };
};
