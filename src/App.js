import React, { useState } from 'react'
import { useMoralis, useMoralisWeb3Api } from "react-moralis"
import { getContractActions } from "./utils/getContractActions"

const App = () => {
  const  ether = require('etherscan-api').init(process.env.REACT_APP_ETHER_API_KEY)
  const { authenticate, isAuthenticated, user, logout, auth } = useMoralis()

  // retrieve abi using etherscan-api
  const getAbi = ether.contract.getabi('0xA4631A191044096834Ce65d1EE86b16b171D8080')

  getAbi
    .then(function(response){
      const abi = response.result

      getContractActions(abi).then((contractMethods) => {
        console.log('contract actions', contractMethods)
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
    )
  }

  return (
    <div>
      <h1>Welcome {user.get("username")}</h1>
      <button onClick={() => logout()}>Logout</button>
      {auth.state}
    </div>
  )
}

export default App