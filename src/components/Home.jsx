import {useState, useEffect} from "react";
import {ethers} from "ethers";
import token_abi from "../../artifacts/contracts/Token.sol/Token.json";
export default function Home() {

    const [ethWallet, setEthWallet] = useState(undefined);
    const [account, setAccount] = useState(undefined);
    const [token, setToken] = useState(undefined);
    const [balance, setBalance] = useState(undefined);
  
    const contractAddress = "0x94023ef7D5E19d5982C888C8e2be28326F24c56B";
    const tokenABI = token_abi.abi;
  
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
  
    const getTokenContract = () => {
      const provider = new ethers.providers.Web3Provider(ethWallet);
      const signer = provider.getSigner();
      const tokenContract = new ethers.Contract(
        contractAddress,
        tokenABI,
        signer
      );
  
      setToken(tokenContract);
    };
  
    const getBalance = async () => {
      if (token) {
        const accountBalance = await token.getBalance();
        console.log(accountBalance)
        setBalance(accountBalance.toString());
      }
    };
  
    const mintToken = async () => {
      if (token) {
        const tx = await token.mint();
        await tx.wait();
        getBalance();
      }
    };
  
    const burnToken = async () => {
      if (token) {
        const tx = await token.burn();
        await tx.wait();
        getBalance();
      }
    };
  
    const initUser = () => {
      // Check if the user has MetaMask
      if (!ethWallet) {
        return <p>Please install MetaMask to use this application.</p>;
      }
  
      // Check if the user is connected. If not, connect to their account
      if (!account) {
        return (
          <button onClick={connectAccount}>
            Please connect your MetaMask wallet
          </button>
        );
      }
  
      if (balance !== undefined) {
        getBalance();
      }
  
      return (
        <div>
          <p>Your Account: {account}</p>
          <p>Your Token Balance: {balance}</p>
          <button onClick={mintToken}>Mint 100 Token</button>
          <button onClick={burnToken}>Burn 100 Token</button>
        </div>
      );
    };
  
    useEffect(() => {
      getWallet();
    }, []);
  
    return (
      <main className="container">
        <header>
          <h1>Welcome to the Token App!</h1>
        </header>
        {initUser()}
        <style jsx>{`
          .container {
            text-align: center;
          }
        `}</style>
      </main>
    );
  }
  