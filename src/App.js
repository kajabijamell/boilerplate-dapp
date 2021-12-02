import React, { useState, useEffect } from 'react'
import { useMoralis } from 'react-moralis'
import { getContractActions } from './utils/getContractActions'

const App = () => {
  const { account, isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading, authenticate, user, logouta } = useMoralis()
  const address = '0x66fCA7555CD481545A5e66bA9a2bEC1e256F98e7'
  const [formInputs, updateFormInputs] = useState([]);
  const [abi, setAbi] = useState([]);

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);
 
  useEffect(function effectFunction() {
    getContractActions(address).then((response) => {
      updateFormInputs(response.contractMethods.forms);
      setAbi(response.abi);
    });
  }, []);

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
      <div style={{padding: '2rem', border: '1px solid black', marginTop: '2rem'}}>
        {formInputs}
      </div>
    </div>
  )
}

export default App