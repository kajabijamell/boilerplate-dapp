import React, { useState } from 'react';
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { getCalls } from "./utils/getCalls";

const App = () => {
  const  ether = require('etherscan-api').init(process.env.REACT_APP_ETHER_API_KEY);
  const { authenticate, isAuthenticated, user, logout, auth } = useMoralis();

  const getAbi = ether.contract.getabi('0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D');
  
  getAbi
    .then(function(response){
      const abi = response.result
      getCalls(abi).then((viewElements) => {
        console.log(viewElements);
      }).catch((error) => {
        console.log('Something went wrong with getCalls:', error)
      })
    })
    .catch((error) => {
      console.log('Something went wrong with getAbi:', error)
    })

  if (!isAuthenticated) {
    return (
      <div>
        <button onClick={() =>  authenticate()}>Authenticate</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome {user.get("username")}</h1>
      <button onClick={() => logout()}>Logout</button>
      {auth.state}
    </div>
  );

}

export default App;