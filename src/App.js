import React from 'react'
import { useMoralisDapp } from './providers/MoralisDappProvider/MoralisDappProvider'
import { useSmartContract } from './providers/SmartContractProvider/SmartContractProvider'

const App = () => {
  const { account, isAuthenticated, authenticate, user, logout } = useMoralisDapp()
  const { formInputs } = useSmartContract()
  
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
      <p>{account}</p>
      <button onClick={() => logout()}>Logout</button>
      {formInputs}
    </div>
  )
}

export default App