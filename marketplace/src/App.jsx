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
  const [count, setCount] = useState(0)

  return (
    <AppContext.Provider>
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
