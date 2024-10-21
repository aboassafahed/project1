
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
export default function Header() {
  function HandleLogout(){
    axios.post('http://127.0.0.1:8000/api/logout',null,{
    headers :{
    Authorization :"Bearer" +token,
  },
 })
 cookie.remove("Bearer");
 window.location.pathname ="/";
   }

   const cookie = new Cookies();
   const token =cookie.get("Bearer");
   console.log(token)
 
  return (
    <div className="container shadow ">
      <nav className="d-flex p-2 ">
        <div className="d-flex flex-1">
          <Link to="/"> Home</Link>
          <Link to="/about"> About</Link>
        </div>

        <div className="d-flex">
        { !token ? (<>
        <Link  to="/signup" 
        className="register_nav" 
        style={{ textAlign: "center" }}>
          signup
        </Link>

        <Link to="/login" 
          className="register_nav" 
          style={{ textAlign: "center" }}>
           login
        </Link></>)
   :(
   <>
        <Link to="/dashboard" 
          className="register_nav" 
          style={{ textAlign: "center" }}>
           dashboard
        </Link>
        
        <div className="register_nav" onClick={HandleLogout} >
         Logout 
        </div>
        </>)}  
      </div>
      </nav>
    </div>
  );
}
