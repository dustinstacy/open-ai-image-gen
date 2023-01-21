import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

const inititalState = {
  user: null,
  fetchingUser: true,
  prompts: [],
  promptHistory: [],
};

const globalReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROMPTS":
      return {
        ...state,
        prompts: action.payload,
      }
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        fetchingUser: false,
      }
    case "SET_HISTORY":
      return {
        ...state,
        promptHistory: action.paylod,
      }
    case "RESET_USER":
      return {
        user: null,
        fetchingUser: false,
        promptsHistory: [],
      }
    default:
      return state;
  }
};

const GlobalContext = createContext(inititalState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, inititalState);

  useEffect(() => {
    getCurrentUser();
  }, [])

  const getPrompts = async () => {
    try {
      const res = await axios.get("/api/prompts");

      if (res.data) {
        dispatch({
          type: "SET_PROMPTS", payload: res.data
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getCurrentUser = async () => {
    try {
      const res = await axios.get("/api/auth/current");

      if (res.data) {
        dispatch({
          type: "SET_USER", payload: res.data
        })

        const promptHistoryRes = axios("/api/history/current");

        if (promptHistoryRes.data) {
          dispatch({
            type: "SET_HISTORY", payload: promptHistoryRes.data
          })
        }
      } else {
        dispatch({type: "RESET_USER"})
      }
    } catch (error) {
      console.log(error);
    }
  }

  const logout = async () => {
    try {
      await axios.put("/api/auth/logout");

      dispatch({type: "RESET_USER"})
    } catch (error) {
      console.log(error);
      dispatch({type: "RESET_USER"})
    }
  }

  const value = {
    ...state,
    getCurrentUser,
    getPrompts,
    logout,
  };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = () => useContext(GlobalContext);
