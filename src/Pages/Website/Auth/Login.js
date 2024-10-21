import Header from "../../../Component/Header";
import { useContext,  useState } from "react";
import axios from "axios";
import './login.css';
import { User } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Err, setErr] = useState(false);
  const [accept, setAccept] = useState(false);
  const userNow =useContext (User);
//cookie
  const cookie = new Cookies();
  
  const nav =useNavigate();
  async function Submit(e) {
    e.preventDefault();
    setAccept(true);
    try {

      let res = await axios.post( 'http://127.0.0.1:8000/api/login', {
            email: email,
            password: password,
          });
          const token =res.data.data.token;
          const userDetails =res.data.data.user;
          cookie.set("Bearer" , token,{path:"/"});
          userNow.setAuth({token,userDetails});
          nav("/dashboard")
    } catch (err) {
     if( err.response.status===401){
      setErr(true)
     }
     setAccept(true)
    }
  }
  return (
    <div>
      <Header />
      <div className="parent login">
        <div className="register login">
          <form onSubmit={Submit}>
          <label htmlFor="email"> email</label>
          <input
            type="email"
            id="email"
            placeholder="email..."
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
         
          <label htmlFor="password"> password</label>
          <input
            type="password"
            id="password"
            placeholder="password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password.length < 8 && accept && (
            <p className="error">password must be more than 8 char</p>
          )}
          <div style={{ textAlign: "center" }}>
              <button type="submit"> login </button>
          </div>
          {accept && Err && (
            <p className="error">Warring email and password </p>
          )}
          </form>
        </div>
      </div>
    </div>
  );
}
