import React from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

import "./App.css";


const App = () => {
  const { authenticate, isAuthenticated, user } = useMoralis();
  const Web3Api = useMoralisWeb3Api()

  if (!isAuthenticated) {
    return (
      <div>
        <button onClick={() => authenticate()}>Authenticate</button>
      </div>
    );
  }


  return (
    <div>
      <h1>Welcome {user.get("username")}</h1>
    </div>
  );

}

export default App;