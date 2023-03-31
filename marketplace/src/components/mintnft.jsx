import React,{useState,useContext,useEffect,useRef} from "react";
import jeep from "../assets/jeep.jpeg"
import { AppContext } from "../../contexts/AppContexts";
import { NFTABI } from "../abis/nftabi";
import { NFTMinterAddress } from "../contractsadress/address";
import { NFTMarketAddress } from "../contractsadress/address";
import { MarketPlaceABI } from "../abis/marketplaceabi";
import { Web3Storage } from "web3.storage";
import Web3Modal from "web3modal"
import {providers,Contract} from "ethers";
import { BigNumber } from "ethers";
import { ethers } from "ethers";
const key = import.meta.env.KEY 

const getAccessKey = ()=>{
    return import .meta.env.VITE_KEY ;
    
}
const makeStorageClient = ()=>{
    return new Web3Storage({token: getAccessKey()});  
}
const upload = (file)=>{
    const client = makeStorageClient();
    const file_cid = client.put(file);
    return file_cid ;
}

const makeFileObjects = (file,file_name)=>{
const blob = new Blob([JSON.stringify(file),{type: "application/json"}]);
const files = [new File([blob],`${file_name}.json`)];
return files;
}
console.log("the key is",getAccessKey() );
const Mintnftform= ()=>{
    const web3ModalRef = useRef()
     
    const getProviderOrSigner =async (needSigner = false)=>{
        const provider =await  web3ModalRef.current.connect();
        const web3Provider = new providers.Web3Provider(provider);
        const {chainId} =  await web3Provider.getNetwork();
        const signer =  web3Provider.getSigner();
        const address = await signer.getAddress();
        setAccount( address);
        if ( chainId != 80001 ){
          alert("please connect to mumbai Network");
        }
        if(needSigner){
          const signer =  web3Provider.getSigner();
          return signer;
        }
        return web3Provider;
    
      }
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [ipfsImage, setIpfsImage] = useState("");
    const [description, setDescription] = useState("");
    const [account,setAccount] = useState();
    
    const [imageNft, setImageNft] = useState(jeep);
    // check if all form data has been filled
  const isFormFilled = () => name && ipfsImage && description;
    const uploadToIpfs = async (e) => {
        const image = e.target.files;
        setImageNft(URL.createObjectURL(e.target.files[0]));
        const image_name = image[0].name;
        setName(image_name);
      
        if (!image) return;
        // Pack files into a CAR and send to web3.storage
        const cid = await upload(image); // Promise<CIDString>
        const image_url = `https://${cid}.ipfs.w3s.link/${image_name}`;
      
        return image_url;
      };
      
   
      const createNFT = async()=>{
        
        
            if (!name || !description || !ipfsImage){
                console.log("its empty")
            };
            const { defaultAccount } = account;
        
            // convert NFT metadata to JSON format
            const data = JSON.stringify({
              name,
              description,
              image: ipfsImage,
              owner: defaultAccount,
            });
            try{
                const files = makeFileObjects(data,name);
                const file_cid = await upload(files);
                 // IPFS url for uploaded metadata
      const url = `https://${file_cid}.ipfs.w3s.link/${name}.json`;
      alert(url);
      console.log("the url",url)
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(NFTMinterAddress,NFTABI,signer);
      const transaction = await contract.createNFT(url);
      const receipt = await transaction.wait(); // Wait for transaction confirmation
      const transferEvent = receipt.events.find((event) => event.event === "Transfer");
      const tokenCount = transferEvent.args.tokenId.toString();
    console.log("count token",tokenCount);
    //   const NFTprice = Number(ethers.utils.parseUnits(String(price), "ether"));
    const NFTprice = Number(ethers.BigNumber.from(price));
      console.log(NFTprice);
      await contract.approve(NFTMarketAddress,tokenCount);
   const contract2 = new Contract(NFTMarketAddress,MarketPlaceABI,signer);
   const tx =  contract2.listNFT(NFTMinterAddress,tokenCount,NFTprice);
   
  alert("mint done");
            }catch(error){
                console.log("create error", error);
                alert("error",error)
            }
    
        
      }
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submitted")
      }
    const onChangePicture = e => {
        console.log('picture: ', e.target.files[0]);
        setImageNft(URL.createObjectURL(e.target.files[0]));
    };
    useEffect(()=>{
        web3ModalRef.current =new Web3Modal({
            network: "mumbai",
            providerOptions: {},
            disableInjectedProvider: false,
            cacheProvider: false,
          });
          getProviderOrSigner();
        
        },[])
    return(

        <div className="h-screen w-full bg-black text-black ">
<div className="w-full h-3/4  flex  justify-center rounded overflow-hidden shadow-lg  ">
    <div className="shadow shadow-orange-700 grid grid-cols-1 gap-8 p-4">
        <h1>Create An NFT</h1>
        <img className="  max-h-60 max-w-md" src={imageNft} alt="image"/>
    <form  onSubmit={handleSubmit}>

        <div className=" grid grid-cols-1 gap-4">
        <input type="file" onChange={async (e) => {
                const imageUrl = await uploadToIpfs(e);
                if (!imageUrl) {
                  alert("failed to upload image");
                  return;
                }
                setIpfsImage(imageUrl);
              }}/>
        <input type="textarea"
                placeholder="description"
                
                onChange={(e) => {
                  setDescription(e.target.value);
                }}/>
                <input type="number"
                placeholder="Price"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}/>


    <button  onClick={()=>{createNFT()}} className="shadow text-white shadow-orange-400" >Create</button>
{console.log("ipfs",ipfsImage)}
{console.log("account is",account)}

        </div>





  </form>
    </div>
  
</div>

            
        </div>
    )


}
export default Mintnftform;