import React,{useState } from 'react'
import {getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {app} from "../../firebase";
import {useRouter} from "next/navigation";

//creating auth instance
const auth = getAuth(app);

const Login =()=>{

    //declaring router variable
    const router =useRouter()

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const signinUser =()=>{
        signInWithEmailAndPassword(auth,email,password).then((value) => {
            alert("Login Successfull");
            router.push("./HomePage");

        })
        .catch((err) => console.log(err));
    }

    return(
    <>
        <div className="flex justify-center items-center h-screen">
            <div className="bg-slate-200 border-2 border-black">
                <div className="p-2 m-2 bg-white">
                    <p className="font-bold text-2xl pb-4">Sign In</p>
                    
                    <div className="grid grid-cols-1 gap-2 my-2">
                        <label htmlFor="e">Email<span className="text-red-600">*</span></label>
                        <input type="email" onChange={e => setEmail(e.target.value)}  value={email} id="e" placeholder="abc@gmail.com" required className="p-1 border border-black"/> 
                        <span id="valid" ></span>        
                    </div>

                    <div className="grid grid-cols-1 gap-2 mb-2">
                        <label htmlFor="p2">Password<span className="text-red-600">*</span></label>
                        <input type="password" onChange={e => setPassword(e.target.value)}  value={password} id="p2" required className="p-1 border border-black" /> 
                        <span id="message1" ></span>
                    </div>

                    <div className="flex justify-between ">
                        < button onClick={signinUser} className="bg-black text-white p-2 rounded-md" >Submit</button>
                        <a href="" className="text-xs text-blue-700 flex items-end">Forget Password</a>
                    </div>

                </div>
            </div>
        </div>
    </>
    )
}

export default Login