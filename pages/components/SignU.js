import React from 'react'
import {useState} from 'react'
const SignUp =()=>{
    const [form,setForm]=useState({fname:"",email:"",ConfirmPassword:""});

    const handleStore =(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
       
    }

    const validatePassword =(e)=>{
        
        //password validation
        let a = document.getElementById("pw1").value;
        let b= document.getElementById("pw2").value;
       

        if(a==b){
            if(a.length!=4 && b.length!=4)
            {
                document.getElementById("message2").innerHTML="Length Should be equal to 4";
                e.preventDefault();
            }
            else
            {
                document.getElementById("message1").innerHTML="Password match";
            }
        }
        else
        {    
            document.getElementById("message2").innerHTML="Password doesn't match";
            e.preventDefault();
              
        }

        //email validation start
        let email = document.getElementById("em").value;
        let testing= /^([a-z0-9]+)@([a-z]+)\.([a-z]+)$/;

        if(testing.test(email))
        {
            document.getElementById("valid").innerHTML="Valid Email";
        }
        else
        {   
            document.getElementById("Invalid").innerHTML="Invalid Email";
            e.preventDefault();
        }
       

    }
    return (
        <form onSubmit={(e)=>validatePassword(e)}>
            <div className="flex justify-center items-center h-screen">
                <div className="bg-slate-200 border-2 border-black">
                    <div className="p-2 m-2 bg-white">
                    <p className="font-bold text-2xl pb-4">Sign Up</p>
                        <div className="grid grid-cols-2 gap-2">
                            
                            <label htmlFor="fn">First Name<span className="text-red-600">*</span></label>
                            <label htmlFor="ln">Last Name</label>
                            
                            <input type="text" name="fname" id="fn" value={form.fname} onChange={handleStore} placeholder="Arun" required className="p-1 border border-black"/> 
                            <input type="text" name="lname" id="ln"  placeholder="Verma" className="p-1 border border-black"/> 

                        </div>
                        <div className="grid grid-cols-1 gap-2 my-2">
                            <label htmlFor="em">Email<span className="text-red-600">*</span></label>
                            <input type="email" name="email" id="em" value={form.email} onChange={handleStore} placeholder="abc@gmail.com" required className="p-1 border border-black"/> 
                            <span id="valid" className="text-green-900"></span>
                            <span id="Invalid" className="text-red-900"></span>
                        </div>
                        <div className="grid grid-cols-1 gap-2 mb-2">
                            <label htmlFor="pw">Password<span className="text-red-600">*</span></label>
                            <input type="password" id="pw1" placeholder="********" required className="p-1 border border-black" /> 
                          
                        </div>
                        <div className="grid grid-cols-1 gap-2 mb-2">
                            <label htmlFor="pw">Confirm Password<span className="text-red-600">*</span></label>
                            <input type="password" name="ConfirmPassword" value={form.ConfirmPassword} onChange={handleStore} id="pw2" required className="p-1 border border-black" /> 
                            <span id="message1" className="text-green-900"></span>
                            <span id="message2" className="text-red-900"></span>
                        </div>

                        <div className="flex justify-between">
                            <input type="submit"  className="bg-black text-white p-2 rounded-md" value="Submit"/>
                            <a href="" className="flex items-end text-blue-900">Login</a>
                        </div>

                    </div>
                </div>

            </div>
        </form>
    )
}

export default SignUp