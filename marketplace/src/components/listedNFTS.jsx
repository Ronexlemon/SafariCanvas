import React,{useState,useEffect,useContext,useRef} from "react";
import  axios from "axios"
import jeep from "../assets/jeep.jpeg"
import { MarketPlaceABI } from "../abis/marketplaceabi";
import { NFTMarketAddress } from "../contractsadress/address";
import { NFTMinterAddress } from "../contractsadress/address";
import { NFTABI } from "../abis/nftabi";
import { AppContext } from "../../contexts/AppContexts";
import Web3Modal from "web3modal"
import {providers,Contract} from "ethers";
import { BigNumber } from "ethers";
import { ethers } from "ethers";

const ListedNFTS= ()=>{
  const web3ModalRef = useRef()
  const getProviderOrSigner =async (needSigner = false)=>{
    const provider =await  web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const {chainId} =  await web3Provider.getNetwork();
   
    if ( chainId != 80001 ){
      alert("please connect to mumbai Network");
    }
    if(needSigner){
      const signer =  web3Provider.getSigner();
      return signer;
    }
    return web3Provider;

  }
  const [data,setData]  = useState([]);
  
  // get the metedata for an NFT from IPFS
 const fetchNftMeta = async (ipfsUrl) => {
  try {
    if (!ipfsUrl) return null;
    const meta = await axios.get(await ipfsUrl);
    const data = JSON.parse(meta.data);
    console.log("the data is",typeof(data));
    return data;

  } catch (e) {
    console.log({ e });
  }
};

  const getAllNFT =  async()=>{
    try{
      const nfts = [];
      const provider = await getProviderOrSigner();
      const contract =  new Contract(NFTMarketAddress,MarketPlaceABI,provider)
      const contract2 =  new Contract(NFTMinterAddress,NFTABI,provider)
      const nftsLength = await contract.getListinglength()
        
      // contract starts minting from index 1
      for (let i = 0; i <  Number(nftsLength); i++) {
        const nft = new Promise(async (resolve) => {
          const listing = await contract.getNFTListing(i);
          const res = await contract2.tokenURI(i);
          console.log("the res is",typeof(res));
          const meta = await fetchNftMeta(await res);
          resolve({
            index: i,
            nft: listing.nft,
            tokenId: listing.tokenId,
            price: listing.price,
            seller: listing.seller,
            forSale: listing.forSale,
            name: meta.name,
            owner:meta.owner,
            image: meta.image,
            description: meta.description,
          });
        });
        nfts.push(nft);
      }
      //return Promise.all(nfts);
      const _Nfts = await Promise.all(nfts);
    setData(_Nfts);
    } catch (e) {
      console.log({ e });
    }
  }
  
  useEffect(()=>{
    web3ModalRef.current =new Web3Modal({
        network: "mumbai",
        providerOptions: {},
        disableInjectedProvider: false,
        cacheProvider: false,
      });
      getAllNFT();
    
    },[])

    return(


        <div className="h-screen w-full bg-black text-white grid grid-cols-4 gap-4  place-items-start">
  {data?.map((element) => (
        
        <div class="text-white max-w-sm rounded overflow-hidden shadow-lg ">
  <img class="w-full" src={`${element.image}`} alt="Sunset in the mountains"/>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">{element.name}</div>
    <p class="text-gray-700 text-base">
     {element.description}
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{Number(element.price)} ETH</span>
    
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Buy</span>
    
  </div>
  </div>
      ))}
        </div>
    )


}
export default ListedNFTS;