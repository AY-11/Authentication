"use client";
import React, { useState } from 'react';
//import { getAuth,createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
//import { app } from "../../firebase";
import Link from 'next/link';
//import { useRouter } from "next/navigation";
import { useAuth } from '@/context/autContext';

//const auth = getAuth(app);

const Sup =()=>{

   const {creatUser} = useAuth();

    //const router = useRouter()

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [dname,setName]=useState("");

    const createUser =async()=>{
      

        let a = document.getElementById("pw1").value;
        let b= document.getElementById("pw2").value;
       
        let passwordCheck = true;

        if(a==b){
            if(a.length<6 && b.length<6)
            {   document.getElementById("message1").style.color="red";
                document.getElementById("message1").innerHTML="Length Should be greater than 6";
                passwordCheck = false;
              
            }
            else
            {   document.getElementById("message1").style.color="green";
                document.getElementById("message1").innerHTML="Password match";
                passwordCheck = true;
            }
        }
        else
        {     document.getElementById("message1").style.color="red";
            document.getElementById("message1").innerHTML="Password doesn't match";
            passwordCheck = false;
         
        }

        
        //email validation start
        let email = document.getElementById("em").value;
        let testing= /^([a-z0-9]+)@([a-z]+)\.([a-z]+)$/;

        let emailCheck = true;

        if(testing.test(email))
        {     document.getElementById("valid").style.color="green";
            document.getElementById("valid").innerHTML="Valid Email";
            emailCheck = true;
        }
        else
        {   document.getElementById("valid").style.color="red";
            document.getElementById("valid").innerHTML="Invalid Email";
            emailCheck=false;
        }
        
        if(emailCheck==true &&  passwordCheck==true)
        {   const success = await creatUser(email, password, dname);

            console.log(success);
            if (success) {
                console.log("success signin");
                // Redirect or handle successful signup
            } else {
                console.log('Failed to create an account. Please try again.');
            }
            
           
            
            /*
            updateProfile({
                displayName:dname,
            });

            console.log(dname);
           */
        }
        else
        {
            alert("Please Fill The Details Correctly!");
        }
    };

    return(
        <>
        {/*
            <div>
             
                <label>Email</label>
                <input type="email" onChange={e => setEmail(e.target.value)}  value={email} className="border-2 boorder-black"/>
                
                <label>Password</label>
                <input type="password" onChange={e => setPassword(e.target.value)}  value={password} className="border boorder-black"/>

                <button onClick={createUser} >Click</button>
            </div>
            */ }
            <div className="flex justify-center items-center h-screen">
                <div className="bg-slate-200 border-2 border-black">
                    <div className="p-2 m-2 bg-white">
                    <p className="font-bold text-2xl pb-4">Sign Up</p>
                        <div className="grid grid-cols-2 gap-2">
                            
                            <label htmlFor="fn">First Name<span className="text-red-600">*</span></label>
                            <label htmlFor="ln">Last Name</label>
                            
                            <input type="text" name="fname" id="fn" value={dname} onChange={e=>setName(e.target.value)} placeholder="Arun" required className="p-1 border border-black"/> 
                            <input type="text" name="lname" id="ln"  placeholder="Verma" className="p-1 border border-black"/> 

                        </div>
                        <div className="grid grid-cols-1 gap-2 my-2">
                            <label htmlFor="em">Email<span className="text-red-600">*</span></label>
                            <input type="email" onChange={e => setEmail(e.target.value)}  value={email} id="em" placeholder="abc@gmail.com" required className="p-1 border border-black"/> 
                            <span id="valid" ></span>
                            
                        </div>
                        <div className="grid grid-cols-1 gap-2 mb-2">
                            <label htmlFor="pw1">Password<span className="text-red-600">*</span></label>
                            <input type="password" id="pw1" placeholder="********" required className="p-1 border border-black" /> 
                            <span className="text-xs text-red-500">password should be of atleast 6 characters</span>
                        </div>
                        <div className="grid grid-cols-1 gap-2 mb-2">
                            <label htmlFor="pw2">Confirm Password<span className="text-red-600">*</span></label>
                            <input type="password" onChange={e => setPassword(e.target.value)}  value={password} id="pw2" required className="p-1 border border-black" /> 
                            <span id="message1" ></span>
                           
                        </div>

                        <div className="flex justify-between">
                            < button onClick={createUser} className="bg-black text-white p-2 rounded-md" >Submit</button>
                            <Link  href="components/Login"><span className=" text-xs flex items-end text-black">Already have an account?<span className=" text-xs flex items-end text-blue-900">Login</span></span></Link>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Sup