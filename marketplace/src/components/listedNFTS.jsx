import React,{useState,useEffect,useContext} from "react";
import jeep from "../assets/jeep.jpeg"
import { MarketPlaceABI } from "../abis/marketplaceabi";
import { NFTMarketAddress } from "../contractsadress/address";
import { AppContext } from "../../contexts/AppContexts";

const ListedNFTS= ()=>{
  const [data,setData]  = useState([]);

  const getAllNFT =  async()=>{
    try{
      let _data= [];
      const provider = await getProviderOrSigner();
      const contract = new Contract(NFTMarketAddress,MarketPlaceABI,provider);
      const  results = await contract.getAllNFTListing();
      results?.forEach((element)=>{
        _data.push(element);
      });
      setData(_data);

    }catch(error){
      console.log("the all nft error is: ", error);
    }
  }
  const {
    getProviderOrSigner,
        Contract,
} = useContext(AppContext)

useEffect(()=>{
getAllNFT();
},[])
console.log("the data is", Number(data.price));
    return(


        <div className="h-screen w-full bg-black text-white grid grid-cols-4 gap-4  place-items-start">
<div class="max-w-sm rounded overflow-hidden shadow-lg ">
  <img class="w-full" src={jeep} alt="Sunset in the mountains"/>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
    <p class="text-gray-700 text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">2.5 ETH</span>
    
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Buy</span>
    
  </div>
</div>
{/* second */}
<div class="max-w-sm rounded overflow-hidden shadow-lg  ">
  <img class="w-full" src={jeep} alt="Sunset in the mountains"/>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
    <p class="text-gray-700 text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">2.5 ETH</span>
    
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Buy</span>
    
  </div>
</div>
{/* third */}
<div class="max-w-sm rounded overflow-hidden shadow-lg ">
  <img class="w-full" src={jeep} alt="Sunset in the mountains"/>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
    <p class="text-gray-700 text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">2.5 ETH</span>
    
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Buy</span>
    
  </div>
</div>
{/* fourth */}
<div class="max-w-sm rounded overflow-hidden shadow-lg ">
  <img class="w-full" src={jeep} alt="Sunset in the mountains"/>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
    <p class="text-gray-700 text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">2.5 ETH</span>
    
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Buy</span>
    
  </div>
</div>
            
        </div>
    )


}
export default ListedNFTS;