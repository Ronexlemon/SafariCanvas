import React from "react";
import LandingNavBar from "../components/landingNavbar";
import LandingBody from "../components/landbody";

const LandingPage = ()=>{
    return(

        <div className="h-full min-h-screen bg-black " >
 <LandingNavBar/>
 <LandingBody/>
        </div>
       
    )


}
export default LandingPage;