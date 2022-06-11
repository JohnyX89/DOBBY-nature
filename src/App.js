import React, { useEffect } from 'react';
import './App.css';
import { useMoralis, MoralisProvider,useWeb3ExecuteFunction, useMoralisWeb3Api, useChain } from "react-moralis";
import { isCommunityResourcable } from '@ethersproject/providers';


function App() {
  <script src="https://unpkg.com/moralis@0.0.184/dist/moralis.js"></script>
  const { authenticate, isAuthenticated, isAuthenticating, user, account, logout, Moralis} = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();
  const {chain} = useChain()

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


  async function donate(val) {
    console.log("Test")
    let options = {
      contractAddress: "0x46618B5d0C719e5b2F59A83BE6B03289bcD757F4",
      functionName: "DonateMoneyToContract",
      abi:[
        {
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
    }],
    params:{
      piceInWei:val
    },
      // Params: {
      //   Note: "Thanks for your work",
      // },
      msgValue: Moralis.Units.ETH(val)
    }



    contractProcessor.fetch({
      params:options
    })


    console.log("donated");
  }


  async function showStake() {
    let options = {
      contractAddress: "0x46618B5d0C719e5b2F59A83BE6B03289bcD757F4",
      functionName: "getTotalDonations",
      abi: [
        {
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
      } 
    ]
      // Params: {
      //   Note: "Thanks for your work",
      // },
      // msgValue: Moralis.Units.ETH(0.1),
    }
    await contractProcessor.fetch({
      params:options
    })
    console.log(options);
  }

  return (
    <div>
      <h1>Moralis Hello World!</h1>
      <div>
        <p>Wallet address: {user?.get("ethAddress")} </p>
        <p>Chain name {chain?.name} </p>
      </div>
      <button onClick={logIn}>Moralis Metamask Login</button>
      <button onClick={logOut} disabled={isAuthenticating}>Logout</button>
      <button onClick={() => donate(0.0001)}>Donate 0.01</button>
      <button onClick={() => showStake}>ShowStake</button>
    </div>
  );
}

export default App;
