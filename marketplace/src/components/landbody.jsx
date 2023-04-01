import React from "react";
import elephant from "../assets/elephnat.jpeg"


const LandingBody= ()=>{
    return(

        <div className="h-screen w-full bg-black text-white grid grid-cols-1 place-items-center">
        <div className="h-full w-full relative">
          <img className="absolute top-0 left-0 z-0 object-cover w-full h-full brightness-50 opacity-100 xl:h-[800px]" src={elephant}/>
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <h1 className="text-7xl">SafariCanvas</h1>
          </div>
        </div>
      </div>
    )


}
export default LandingBody;