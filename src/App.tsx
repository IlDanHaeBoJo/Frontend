import React from "react";
import Router from "./Router";
import { UserProvider } from "./store/UserContext";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <Router />
    </UserProvider>
  );
}

export default App;
