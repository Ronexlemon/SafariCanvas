import React from "react";
import jeep from "../assets/jeep.jpeg"

const LandingBody= ()=>{
    return(

        <div className="h-screen w-full bg-black text-white grid grid-cols-2  place-items-center">
            <div>
 <img src={jeep}/>            </div>
 <div>
 <img src={jeep}/>            </div>

            
        </div>
    )


}
export default LandingBody;