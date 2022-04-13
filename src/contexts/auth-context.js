import React, { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

// creating authContext
const AuthContext = createContext({});

// using it via useContext hook
export const useAuthContext = () => useContext(AuthContext);

// creating context provider component and setting all states and logic in there
export const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // calling use effect hook whenever user is changed or react router is changed
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);

      if (user) {
        navigate("/chats");
        console.log(user);
      }
    });
  }, [user, navigate]);

  // creating value with user data object
  const value = { user };

  // finally return built in react provider with value of user object and displaying child elements inside of provider
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
