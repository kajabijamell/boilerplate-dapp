import React, { useEffect, useState } from "react";
import SmartContractContext from "./context";
import { getContractActions } from '../../utils/getContractActions'

function SmartContractProvider({ children }) {
  const address = '0x66fCA7555CD481545A5e66bA9a2bEC1e256F98e7'
  const [formInputs, setFormInputs] = useState([]);
  const [abi, setAbi] = useState([]);
 
  useEffect(function effectFunction() {
    getContractActions(address).then((response) => {
      setFormInputs(response.contractMethods.forms);
      setAbi(response.abi);
    });
  }, []);

  return (
    <SmartContractContext.Provider value={{ abi, formInputs, setAbi, setFormInputs}}>
      {children}
    </SmartContractContext.Provider>
  );
}


function useSmartContract() {
  const context = React.useContext(SmartContractContext);
  if (context === undefined) {
    throw new Error("useSmartContract must be used within a SmartContractProvider");
  }
  return context;
}

export { SmartContractProvider, useSmartContract };
