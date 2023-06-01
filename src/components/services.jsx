import abi from "../../artifacts/contracts/Token.sol/Token.json"
import { ethers } from 'ethers'

const {ethereum } = window
const contractAbi = abi.abi


const contractAddress =  "0xA8Cd4132D092D1332361E5D14d7b3F74C7d68Be0";

const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // Once the wallet is set, get a reference to the deployed contract
    getTokenContract();
  };
  const getContract = async () => {
    const connectedAccount = connectAccount
  
    if (connectedAccount) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, contractAbi, signer)
      return contract
    } else {
      return getGlobalState('contract')
    }
  
  }

  const getBalance = async () => {
    try {
        if (!ethereum) return alert("Please install Metamask")
        const connectedAccount = connectAccount
        const contract = await getContract()
        const transaction = await contract.getBalance()
        console.log("account :", transaction)
      return 
    } catch (error) {
      reportError(error)
    }
  }





const reportError = (error) => {
    console.log(error.message)
    throw new Error( "Error", error)
}

export {
    connectWallet,
    isWalletConnected,
    getContract,
    addAsset,
    listAssets,
    listBuyers,
    listAsset,
    buyNewAsset,
    refunAsset,
    confirmAsset,
    listRefund,
    getOwner,
    ProbeAsset,
    ReleaseAsset,
    getNumAsset,
}