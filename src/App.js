import React, { useState } from 'react'
import { useMoralis, useMoralisWeb3Api } from 'react-moralis'
import { getContractActions } from './utils/getContractActions'

const App = () => {
  const { authenticate, isAuthenticated, user, logout, auth } = useMoralis()
  const address = '0xA4631A191044096834Ce65d1EE86b16b171D8080'

  getContractActions(address).then((methods) => {
    console.log(methods)
  });

  if (!isAuthenticated) {
    return (
      <div>
        <button onClick={() =>  authenticate()}>Authenticate</button>
      </div>
    )
  }

  return (
    <div>
      <h1>Welcome {user.get('username')}</h1>
      <button onClick={() => logout()}>Logout</button>
      {auth.state}
    </div>
  )
}

export default App