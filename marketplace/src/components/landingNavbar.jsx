import React from "react";
import { useNavigate } from "react-router-dom";
const LandingNavBar= ()=>{
    const navigate = useNavigate();
    return(

        <div className="h-20 w-full bg-black text-white flex justify-around items-center">
            <div>
 <span>MarketPlace</span>
            </div>
            <div className="bg-orange-300 rounded h-15  ">
                <button onClick={()=>{navigate("/marketplace")}} >Get Started</button>
                </div>

            
        </div>
    )


}
export default LandingNavBar;