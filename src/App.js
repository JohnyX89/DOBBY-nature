import React, { useEffect } from 'react';
import './App.css';
import { useMoralis, MoralisProvider,useWeb3ExecuteFunction, useMoralisWeb3Api, useChain } from "react-moralis";
import { isCommunityResourcable } from '@ethersproject/providers';


function App() {
  <script src="https://unpkg.com/moralis@0.0.184/dist/moralis.js"></script>
  const { authenticate, isAuthenticated, isAuthenticating,user, account, logout, Moralis} = useMoralis();
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
      priceInWei:Moralis.Units.ETH(val)
    },
      // Params: {
      //   Note: "Thanks for your work",
      // },
      msgValue: Moralis.Units.ETH(val)
    }



    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        console.log("Success")
      },
      onError: (error) => {
        console.log("Error")
        console.log(error)
      }
    });


    console.log("donated");
  }

  async function donateCharity(val1,val2) {
    let options = {
      contractAddress: "0x46618B5d0C719e5b2F59A83BE6B03289bcD757F4",
      functionName: "DonateToCharity",
      abi:[
        {
          inputs: [
            {
              "internalType": "address payable",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "balance",
              "type": "uint256"
            }
          ],
          name: "DonateToCharity",
          outputs: [],
          stateMutability: "payable",
          type: "function"
        }],
    params:{
      to:val1,
      balance: Moralis.Units.ETH(val2)
    },
      msgValue: Moralis.Units.ETH(val2)
    }



    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        console.log("Success")
      },
      onError: (error) => {
        console.log("Error")
        console.log(error)
      }
    });


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
          type: "function"
        }
    ]
    }
    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        console.log("Success")
      },
      onError: (error) => {
        console.log("Error")
        console.log(error)
      }
    });
    console.log(parseInt(contractProcessor.data._hex,16));
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
      <button onClick={() => showStake()}>ShowStake</button>
      <button onClick={() => donateCharity('0x35aA2a085532Da8e73f332000D2ae9c42B966da3',0.0001)}>Donate to specific charity</button>
    </div>
  );
}

export default App;
