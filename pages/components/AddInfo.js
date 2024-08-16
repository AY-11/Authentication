
import React,{useState} from 'react';
import {setDoc,doc} from "firebase/firestore";
import {useAuth} from "@/context/autContext";
import { db } from '@/firebase';
import { useRouter } from "next/navigation";
import { storage } from '@/firebase';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import {v4} from 'uuid';

const AddInfo = ()=>{
   
    const {currenUser} = useAuth();


    const router=useRouter();

   const [age,setAge]=useState(0);
   const [phone,setPhone]=useState("");
   const [bank,setBank]=useState("");
   const [ifscCode,setIfscCode]=useState("");
   const [gstCode,setGstCode]=useState("");
   const [pinCode,setPinCode]=useState("");
   const [panNumber,setPanNumber]=useState("");
   const [imag,setImage]=useState("");
   let imagetextUrl="";

   let ageValue=true;
   let phoneValue=true;
   let bankValue=true;
   let ifscCodeValue=true;
   let gstCodeValue=true;
   let pinCodeValue=true;
   let panNumberValue=true;
   let imageValue=true;
   




 
    const checkInfo= async()=>{


        //phone validation for 10 characters
        let ph = document.getElementById("4").value;
        let a = /^[789]{1}[0-9]{9}$/;

        if(a.test(ph)==false)
        {
            document.getElementById("message1").style.color="red";
            document.getElementById("message1").innerHTML="Invalid Phone Number!";
            phoneValue=false;
        }
        else
        {
            document.getElementById("message1").style.color="green";
            document.getElementById("message1").innerHTML="Valid Phone Number";
            phoneValue=true;
        }

        //Bank validation
        let ba=document.getElementById("5").value;

        if(ba.length==11)
        {
            let b=/^[^0]{1}[0-9]{10}$/;
            if(b.test(ba)==false)
            {
                document.getElementById("message2").style.color="red";
                document.getElementById("message2").innerHTML="Invalid Bank Account!";
                bankValue=false;
            }
            else
            {
                document.getElementById("message2").style.color="green";
                document.getElementById("message2").innerHTML="Valid Bank Account";
                bankValue=true;
            }
        }
        else
        {
            document.getElementById("message2").style.color="red";
            document.getElementById("message2").innerHTML="Bank Account should be of 11 digit!";
            bankValue=false;
        }

        //IFSC validation
        let ifsc=document.getElementById("51").value;
        if(ifsc.length==11)
        {
            let z=/^([A-Z]{4})0([0-9]{6})$/
            if(z.test(ifsc)==false)
            {
                document.getElementById("message21").style.color="red";
                document.getElementById("message21").innerHTML="Invalid ifsc!"
                ifscCodeValue=false;
            }
            else
            {
                document.getElementById("message21").style.color="green";
                document.getElementById("message21").innerHTML="Valid ifsc";
                ifscCodeValue=true;
            }
        }
        else
        {
            document.getElementById("message21").style.color="red";
            document.getElementById("message21").innerHTML="IFSC Code should be of 11 digit!";
            ifscCodeValue=false;
        }

        //GST validation
        let gst=document.getElementById("6").value;
        if(gst.length==15)
        {
            let c=/^([0-9]{2})([A-Z]{5})([0-9]{4})([A-Z])([0-9])Z([0-9A-Z])$/
            if(c.test(gst)==false)
            {
                document.getElementById("message3").style.color="red";
                document.getElementById("message3").innerHTML="Invalid Gst Code!";
                gstCodeValue=false;
            }
            else
            {
                document.getElementById("message3").style.color="green";
                document.getElementById("message3").innerHTML="Valid Gst Code";
                gstCodeValue=true;
            }
        }
        else
        {
            document.getElementById("message3").style.color="red";
            document.getElementById("message3").innerHTML="GST Code should be of 15 digit!";
            gstCodeValue=false;
        }

        
        //pincode validation
        let pin = document.getElementById("7").value;

        if(pin.length==6)
        {
            let d= /^[^0]{1}[0-9]{5}$/
            if(d.test(pin)==false)
            {
                document.getElementById("message4").style.color="red";
                document.getElementById("message4").innerHTML="Pincode cannot contain Character's!";
                pinCodeValue=false;
            }
            else
            {
                document.getElementById("message4").style.color="green";
                document.getElementById("message4").innerHTML="Valid Pincode Number";
                pinCodeValue=true;
            }
        }
        else
        {
            document.getElementById("message4").style.color="red";
            document.getElementById("message4").innerHTML="Pincode should be 6 digit!";
            pinCodeValue=false;
        }

        //PAN validation
        let pan=document.getElementById("8").value;
        if(pan.length==10)
        {
            let e=/^([A-Z]{5})([0-9]{4})([A-Z])$/
            if(e.test(pan)==false)
            {
                document.getElementById("message5").style.color="red";
                document.getElementById("message5").innerHTML="Invalid PAN No.!";
                panNumberValue=false;
            }
            else
            {
                document.getElementById("message5").style.color="green";
                document.getElementById("message5").innerHTML="Valid PAN No.";
                panNumberValue=true;
            }
        }
        else
        {
            document.getElementById("message5").style.color="red";
            document.getElementById("message5").innerHTML="PAN No. should be 10 digit!";
            panNumberValue=false;
        }

       
        //image upload
        if (imag == "")
        {
            imageValue=false;
        }
        else
        {   //creating folder inside the storage
            const imageRef = ref(storage,  `images/${imag.name + v4() }`);

            //upload file to the storage
            await uploadBytes(imageRef, imag).then(data =>{
                //contain information about an image
                console.log(data,"imageRef");
                alert("Image UpLoaded Successfully");
                //helps to get the only url

                
            }).catch(e=>console.log("Error in uploading the image in storage",e));

            await getDownloadURL(imageRef).then((url)=>{
                    
                console.log(url,"url");
                imagetextUrl=url;
                console.log(imagetextUrl ,"imagetextUrl");
                alert("link copied to imagetextUrl");
            }).catch(e=>console.log("Error in getting the url",e));

            imageValue=true;
        }

        if(ageValue==true && phoneValue==true && bankValue==true && ifscCodeValue==true && gstCodeValue==true && pinCodeValue==true && panNumberValue==true && imageValue==true)
        {
           
            if(currenUser){
                await setDoc(doc(db,"Users",currenUser.email),{
                    Email:currenUser.email,
                    Name:currenUser.displayName,
                    Age:age,
                    Phone:phone,
                    Bank:bank,
                    Ifsc:ifscCode,
                    Gst:gstCode,
                    PinCode:pinCode,
                    PanNumber:panNumber,
                    ImageUrl:imagetextUrl,

                });
                alert("Data Added Successfully:) ");

                router.push("./HomePage");

            }
          
        }




    }

    return(
        <div>
            { currenUser?(
            <div className="flex justify-center items-center my-4">
                <div className="bg-slate-200 border-2 border-black">
                    <div className="p-2 m-2 bg-white">
                        <p className="font-bold text-2xl pb-4">Add Information</p>

                        <div className="grid grid-cols-1 gap-2 my-2">
                            <label htmlFor="1">Name</label>
                            <input id="1" type="text" value={currenUser.displayName} readOnly className="p-1 border border-black"/>
                        </div>

                        <div className="grid grid-cols-1 gap-2 my-2">
                            <label htmlFor="2">Email</label>
                            <input id="2" type="email" value={currenUser.email} readOnly className="email p-1 border border-black"/>
                        </div>

                        <div className="grid grid-cols-2 gap-2 my-2">
                            <label htmlFor="3">Age</label>
                            <label htmlFor="4">Phone Number</label>
                            <input id="3" type="number" value={age} onChange={e=>setAge(e.target.value)} min="1" max="100" className="p-1 border border-black"/>
                            <input id="4" type="tel"   value={phone} onChange={e=>setPhone(e.target.value)} className="p-1 border border-black"/>
                            <span></span>
                            <span id="message1"></span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 my-2">
                            <label htmlFor="5">Bank Account</label>
                            <label htmlFor="51">IFSC</label>
                            <input id="5" type="text"  value={bank} onChange={e=>setBank(e.target.value)} className="p-1 border border-black" />
                            <input id="51" type="text"  value={ifscCode} onChange={e=>setIfscCode(e.target.value)} className="p-1 border border-black" />
                            <span id="message2"></span>
                            <span id="message21"></span>
                        </div>

                        <div className="grid grid-cols-1 gap-2 my-2">
                            <label htmlFor="6">GST Number</label>
                            <input id="6" type="text"  value={gstCode} onChange={e=>setGstCode(e.target.value)} className="p-1 border border-black"/>
                            <span id="message3"></span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 my-2">
                            <label htmlFor="7">Pincode</label>
                            <label htmlFor="8">PAN Number</label>
                            <input id="7" type="text"  value={pinCode} onChange={e=>setPinCode(e.target.value)} className="p-1 border border-black"/>
                            <input id="8" type="text"  value={panNumber} onChange={e=>setPanNumber(e.target.value)} className="p-1 border border-black"/>
                            <span id="message4"></span>
                            <span id="message5"></span>
                        </div>

                        <div className="grid grid-cols-1 gap-2 my-2">
                            <label htmlFor="9">Select Image</label>
                            <input type="file" id="9" onChange={ e=>setImage(e.target.files[0])}/>
                        </div>

                     {/*   <div className="grid grid-cols-1 gap-2 my-2">
                            <label htmlFor="9">Image</label>
                            <input id="9" type="image" className="p-1 border border-black"/>
                        </div> 
                   */ }

                        <div className="flex justify-center">
                            <button onClick={checkInfo} className="bg-black rounded-md text-white font-semibold p-2">Add Details</button>
                        </div>
                </div>
            </div>
        </div>
            ):(
                <p>Loading...</p>
            )}

    </div>
    )
}

export default AddInfo