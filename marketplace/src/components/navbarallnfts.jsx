import React from "react";

const NavBarAllNFTS= ()=>{
    return(

        <div className="h-20 w-full bg-black text-white flex justify-around items-center">
            <div className="shadow-md shadow-orange-600">
 <button>MarketPlace</button>
            </div>
            <div className=" h-15 shadow-md shadow-orange-600  ">
                <button  >Mint NFT</button>
                </div>
            <div className=" h-15  shadow-md shadow-orange-600 ">
                <button  >MY NFTS</button>
                </div>

            
        </div>
    )


}
export default NavBarAllNFTS;