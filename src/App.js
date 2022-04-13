import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./contexts/auth-context";

import Login from "./components/Login";
import Chats from "./components/Chats";

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chats" element={<Chats />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
