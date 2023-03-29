import React from "react";
import NavBarAllNFTS from "../components/navbarallnfts";
import Mintnftform from "../components/mintnft";


const MintNfts = ()=>{
    return(

        <div className="h-full min-h-screen bg-black ">
 <NavBarAllNFTS/>
 <Mintnftform/>
 
        </div>
       
    )


}
export default MintNfts;