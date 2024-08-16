import React,{useState,useEffect} from "react";
import {useAuth} from "@/context/autContext";
import {db} from "@/firebase";
import {doc,getDoc} from "firebase/firestore";

const Profile =({onClose})=>{
    
    const [userDetails,setuserDetails]=useState(null);
    
    const {currenUser} = useAuth();
    const showData =async()=>{
        
        const docRef = doc(db,"Users",currenUser.email);

        const docSnap =await getDoc(docRef);

        if(docSnap.exists()){
            setuserDetails(docSnap.data());
            console.log(docSnap.data());
        }
        else
        {
            console.log("User has not added the info");
        }

    };

   useEffect(()=>
    {
        showData();
    },[currenUser]);

    return(
        <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm">
        <div>
           {/* <button onClick={showData} className="bg-blue-900 text-white">click</button> */}
            <div className="flex justify-end">
                <button onClick={onClose} className="bg-red-600 py-2 px-4 text-white">X</button>
            </div>
            {userDetails ? (

            <div className="w-[300px] overflow-y-auto">
                <p>Email: {userDetails.Email}</p>
                <p>Name: {userDetails.Name}</p>
                <p>Age: {userDetails.Age}</p>
                <p>Phone Number: {userDetails.Phone}</p>
                <p>Bank Account: {userDetails.Bank}</p>
                <p>Ifsc Code: {userDetails.Ifsc}</p>
                <p>Gst Number: {userDetails.Gst}</p>
                <p>PinCode: {userDetails.PinCode}</p>
                <p>PAN Number: {userDetails.PanNumber}</p>
                <p>Image Url: {userDetails.ImageUrl}</p>
            </div>   
            ):(
                <p>Loading...</p>
            )}
        </div>
        </div>
    )
}

export default Profile;