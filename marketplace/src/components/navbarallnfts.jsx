import React from "react";
import { useNavigate } from "react-router-dom";
const NavBarAllNFTS= ()=>{
    const navigate = useNavigate()
    return(

        <div className="h-20 w-full bg-black text-white flex justify-around items-center">
             <div className="shadow-md shadow-orange-600">
 <button onClick={()=>{navigate("/home")}}>Home</button>
            </div>
            <div className="shadow-md shadow-orange-600">
 <button>MarketPlace</button>
            </div>
            <div className=" h-15 shadow-md shadow-orange-600  ">
                <button onClick={()=>{navigate("/mint")}} >Mint NFT</button>
                </div>
            <div className=" h-15  shadow-md shadow-orange-600 ">
                <button  >MY NFTS</button>
                </div>

            
        </div>
    )


}
export default NavBarAllNFTS;