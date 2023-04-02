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
  const [account,setAccount] = useState();
  const web3ModalRef = useRef()
  const getProviderOrSigner =async (needSigner = false)=>{
    const provider =await  web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const sign =  web3Provider.getSigner();
    const address = await sign.getAddress();
    setAccount( address);
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

  const sellNft = async (id)=>{
    try{
const signer = await getProviderOrSigner(true);
const contract = new Contract(NFTMarketAddress,MarketPlaceABI,signer);
const tx = await contract.sell(id);
    }catch(error){
      console.log("sell error")
    }
  }
  //buy functionality 
  const buyNft = async (id)=>{
    try{
const signer = await getProviderOrSigner(true);
const contract = new Contract(NFTMarketAddress,MarketPlaceABI,signer);
const tx = await contract.buyNFT(id);
    }catch(error){
      console.log("sell error")
    }
  }
  
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


        <div className="h-full min-h-screen w-full bg-black text-white grid grid-cols-1 gap-4 md:grid-cols-3  place-items-start">
  {data?.map((element) => (
        
        <div class="  w-full  md:max-w-sm     md:max-h-min   rounded-lg shadow dark:bg-gray-800 dark:border-gray-700  ">
  <img class=" h-40 object-cover w-full  " src={`${element.image}`} alt="Sunset in the mountains"/>
  <div class="px-6 py-4">
    <div class="font-bold  mb-2">{element.name}</div>
    <p class="text-gray-700 max-w-sm ">
     {element.description}
    </p>
  </div>
  <div class="px-6 flex justify-around pt-4 pb-2">
  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{Number(element.price)} ETH</span>
  {
    account == element.seller? element.forSale==false?<button  onClick={()=>{sellNft(element.tokenId)}} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Sell</button>:<div className="">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Sold</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Cancel</span>
    </div> :<button   onClick={()=>{buyNft(element.tokenId)}} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Buy</button>
  }
    
    
    
  </div>
  </div>
      ))}
        </div>
    )


}
export default ListedNFTS;