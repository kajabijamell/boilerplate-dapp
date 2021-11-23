import React from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

import "./App.css";


const App = () => {
  const { authenticate, isAuthenticated, user } = useMoralis();
  const Web3Api = useMoralisWeb3Api()

  const fetchBlock = async () => {
    const result = await Web3Api.native.getBlock({
      block_number_or_hash: '100000'
    })
    console.log(result)
  }

  if (!isAuthenticated) {
    return (
      <div>
        <button onClick={() => authenticate()}>Authenticate</button>
      </div>
    );
  }

  fetchBlock();

  return (
    <div>
      <h1>Welcome {user.get("username")}</h1>
    </div>
  );

}

export default App;