import React from "react";
import NavBarAllNFTS from "../components/navbarallnfts";

import ListedNFTS from "../components/listedNFTS";
import Mynft from "../components/mynfts";

const MyNFTS = ()=>{
    return(

        <div className="h-full min-h-screen bg-black ">
 <NavBarAllNFTS/>
 <Mynft/>
        </div>
       
    )


}
export default MyNFTS;