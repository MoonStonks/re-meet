import React, { useReducer, createContext } from "react";
export const SET_USER = "SET_USER";

const userReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

const initialUserState = Object.freeze({
  currentUser: {
    name: "",
    email: "",
    events: [],
    groups: [],
    picture: "",
  },
});

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [taskState, dispatch] = useReducer(userReducer, initialUserState);

  return (
    <UserContext.Provider value={[taskState, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
