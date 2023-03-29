import React from "react";
import NavBarAllNFTS from "../components/navbarallnfts";

import ListedNFTS from "../components/listedNFTS";

const MarketPlace = ()=>{
    return(

        <div className="h-full min-h-screen bg-black ">
 <NavBarAllNFTS/>
 <ListedNFTS/>
        </div>
       
    )


}
export default MarketPlace;