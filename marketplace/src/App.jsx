import { useState,useEffect,useRef } from 'react'
import Web3Modal from "web3modal"
import {providers,Contract} from "ethers";
import { AppContext } from '../contexts/AppContexts';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import MarketPlace from './pages/Marketplace';

import reactLogo from './assets/react.svg'

import './App.css'
import LandingPage from './pages/LandingPage';
import MintNfts from './pages/MintNFT';



function App() {
  const web3ModalRef = useRef()
  const [account,setAccount] = useState();
  const getProviderOrSigner =async (needSigner = false)=>{
    const provider =await  web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const {chainId} =  await web3Provider.getNetwork();
    const signer =  web3Provider.getSigner();
    const accounts =await  signer.getAddress();
    setAccount(accounts);
    if ( chainId != 80001 ){
      alert("please connect to mumbai Network");
    }
    if(needSigner){
      const signer =  web3Provider.getSigner();
      return signer;
    }
    return web3Provider;

  }
  console.log("account start", account);
  useEffect(()=>{
    web3ModalRef.current =new Web3Modal({
        network: "mumbai",
        providerOptions: {},
        disableInjectedProvider: false,
        cacheProvider: false,
      });
      
    
    },[])

  return (
    <AppContext.Provider 
    value={{
      getProviderOrSigner,
      Contract,
      account
    }}>
   <Router>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/home' element={<LandingPage/>}/>
      <Route path='/marketplace' element={<MarketPlace/>}/>
      <Route path='/mint' element={<MintNfts/>}/>
    </Routes>
   </Router>
    </AppContext.Provider>
  )
}

export default App
