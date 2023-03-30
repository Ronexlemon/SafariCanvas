import React,{useState} from "react";
import jeep from "../assets/jeep.jpeg"

const Mintnftform= ()=>{
    const [imageNft, setImageNft] = useState();
    const onChangePicture = e => {
        console.log('picture: ', e.target.files[0]);
        setImageNft(URL.createObjectURL(e.target.files[0]));
    };
    return(

        <div className="h-screen w-full bg-black text-white ">
<div class="w-full h-3/4  flex  justify-center rounded overflow-hidden shadow-lg  ">
    <div className="shadow shadow-orange-700 grid grid-cols-1 gap-8 p-4">
        <h1>Create An NFT</h1>
        <img className="  max-h-60 max-w-md" src={imageNft} alt="image"/>
    <form>

        <div className=" grid grid-cols-1 gap-4">
        <input type="file" onChange={onChangePicture}/>


    <button className="shadow shadow-orange-400" >Create</button>


        </div>





  </form>
    </div>
  
</div>

            
        </div>
    )


}
export default Mintnftform;