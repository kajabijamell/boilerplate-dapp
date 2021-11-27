import React from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

const  ether = require('etherscan-api').init(process.env.REACT_APP_ETHER_API_KEY);
var abi = ether.contract.getabi('0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D');
abi.then(function(retrievedAbi){
  console.log(retrievedAbi.result);
});

const App = () => {
  const { authenticate, isAuthenticated, user, logout, auth } = useMoralis();

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