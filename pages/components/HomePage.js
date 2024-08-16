import React,{useState} from 'react';

import {useAuth} from "@/context/autContext";
import Profile from './Profile';

const HomePage =()=>{

    const {logout} =useAuth();

    const [showProfile,setShowProfile]=useState(false); 
    const letsLogout= async ()=>{
        const outputsee= await logout();

        if(outputsee){
            alert("logout Successfull")
        }
        else
        {
            console.log("unable to logout");
        }
    }

    return(
    <>
        <div className="bg-gradient-to-tr from-[#D13ED4] to-[#2136EB]">
                <div className="flex justify-between items-center ">
                    <div className="ml-4">
                        <div className="mb-1 w-8 h-0.5 bg-black"></div>
                        <div className="mb-1 w-8 h-0.5 bg-black"></div>
                        <div className="w-8 h-0.5 bg-black"></div>
                    </div>
                    <div className="flex gap-2 text-white">
                        <button onClick={()=>setShowProfile(true)}>Profile</button>
                        <button className="mr-2">Setting</button>
                        <button onClick={letsLogout} className="mr-2 bg-black text-white rounded-md p-2">Logout </button>
                    </div>
                   
                   
                </div>
            </div>
        <div className=" flex justify-center mt-3">
            <p className="text-3xl bg-black text-white font-bold"> Welcome!</p>
        </div>

        {showProfile && <Profile onClose={() => setShowProfile(false)}/>}

    </>
    )

}

export default HomePage;