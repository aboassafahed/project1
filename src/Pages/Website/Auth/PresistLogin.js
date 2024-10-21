import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { User } from "../Context/Context";
import LoadingScreen from "../../../Component/LoadingScreen";
import Cookies from "universal-cookie";

export default function PresistLog(){
    //Get Current User
    const context = useContext(User);
    const token = context.auth.token;
    const [loading,setLoading]=useState(true);

    //cookie
    const cookie =new Cookies();
    const getToken =cookie.get("Bearer");
 

    //send refresh token
    useEffect(() =>{
    async function refresh(){
        try{
         await axios.post('http://127.0.0.1:8000/api/refresh',null,{
           headers :{
             Authorization :"Bearer " +getToken,
           },
         })
         .then((data) =>{
            cookie.set("Bearer",data.data.token,{path:"/"})
            context.setAuth((prev)=>{return{userDetails:data.data.user,token:data.data.token}})
        });
        }
        catch (err){
         console.log(err)
        }finally{
            setLoading(false)
        }
        }
  
    !token ?refresh() :setLoading(false)   ; 
},[])
    return loading ?<LoadingScreen/> :<Outlet/> ;
}