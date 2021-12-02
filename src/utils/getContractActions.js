import { deconstructAbi } from "./deconstructAbi"
const ether = require('etherscan-api').init(process.env.REACT_APP_ETHER_API_KEY)

// retrieve abi using etherscan-api
export const getContractActions = async (address) => {
  try {
    const getAbi = ether.contract.getabi(address)
    const response = await getAbi
    const abi = response.result
    const contractMethods = await deconstructAbi(abi)

    const contractData = {
      contractMethods: contractMethods,
      abi: abi,
    }
    return contractData
  } catch (error) {
    console.error('Something went wrong with retrieving contract actions:', error)
  }
}