import React, { useEffect } from 'react';
import './App.css';
import { useMoralis, MoralisProvider } from "react-moralis";
import { Moralis } from "moralis"
import Body from "./components/Body"


function App() {
  <script src="https://unpkg.com/moralis@0.0.184/dist/moralis.js"></script>
  const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

  useEffect(() => {
    if (isAuthenticated) {
      // add your logic here
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const logIn = async () => {
    if (!isAuthenticated) {

      await authenticate({ signingMessage: "Log in using Moralis" })
        .then(function (user) {
          console.log("logged in user:", user);
          // console.log(user!.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const logOut = async () => {
    await logout();
    console.log("logged out");
  }


  async function donate() {
    let options = {
      contractAddress: "0x46618B5d0C719e5b2F59A83BE6B03289bcD757F4",
      functionName: "DonateMoneyToContract",
      inputs: [
        {
          "internalType": "uint256",
          "name": "priceInWei",
          "type": "uint256"
        }
      ],
      name: "DonateMoneyToContract",
      outputs: [],
      stateMutability: "payable",
      type: "function",
      // Params: {
      //   Note: "Thanks for your work",
      // },
      msgValue: Moralis.Units.ETH(0.015),
    };


    console.log("donated");
  }


  async function showStake() {
    let options = {
      contractAddress: "0x46618B5d0C719e5b2F59A83BE6B03289bcD757F4",
      functionName: "getTotalDonations",
      inputs: [],
      name: "getTotalDonations",
      outputs: [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      stateMutability: "view",
      type: "function",
      // Params: {
      //   Note: "Thanks for your work",
      // },
      // msgValue: Moralis.Units.ETH(0.1),
    };
    console.log(options);
  }

  return (
    <div>
      <h1>Moralis Hello World!</h1>
      <button onClick={logIn}>Moralis Metamask Login</button>
      <button onClick={logOut} disabled={isAuthenticating}>Logout</button>
      <button onClick={donate} disabled={isAuthenticating}>Donate</button>
      <button onClick={showStake} disabled={isAuthenticating}>Show donated</button>
      <Body></Body>
    </div>
  );
}

export default App;
