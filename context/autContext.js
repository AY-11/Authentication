import {createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile} from "firebase/auth";
import {useRouter} from "next/router";
import {createContext,useContext,useEffect,useState} from "react";

import {auth} from "../firebase";

const AuthContext =createContext();

export const AuthProvider = ({children})=>{

    const router = useRouter();

    const [currenUser,setCurrentUser]= useState(null);
    const [isLoading,setLoading]=useState(false);

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(async(user)=>{
            
            setLoading(true);

            //setCurrentUser(user);

            if(!currenUser){
                if(user){
                    setCurrentUser(user);
                }
                else
                {
                    setCurrentUser(null);
                }
            }
            setLoading(false);
        });
        return unsubscribe;
    },[]);

    const login =async (email,password)=>
    {
        try{
            await signInWithEmailAndPassword(auth,email,password).then((value) => {
                alert("Login Successfull");
                router.push("./HomePage");
              
            })
            return true;
        }
        catch(e){
            console.log(e);
            return false;
        }
       
    };

    const logout =async()=>{
        try{
            await auth.signOut();
            setCurrentUser(null);
            router.push("/");

            return true;
        }
        catch(e){
            console.log("Failed to Logout");
            return false;
        }
    }
    
    const creatUser = async(email,password,name)=>{
   
    try{
        
        await createUserWithEmailAndPassword(auth,email,password).then((value)=>{
            alert("User Registered Successfully");
            
            const user =auth.currentUser;
        
            console.log(name);
            if(user)
            {
                updateProfile(user,{
                    displayName:name,
                });

               
            }

            console.log(user);
            router.push("/components/AddInfo");

    })
    return true;
    }
    catch(e ){
        console.log(e);
        return false;
    }
    
};

    return(
        <AuthContext.Provider 
        value ={{
            currenUser,
            isLoading,
            login,
            creatUser,
            logout,
        }}
        >
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth =()=>{
    return useContext(AuthContext);
}

