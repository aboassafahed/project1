import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../Website/Context/Context";
import axios from "axios";

export default function UpdateUser(){
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [emailerr, setEmailerr] = useState(false);
  const [accept, setAccept] = useState(false);
  const nav =useNavigate();
  const context = useContext(User);
  const token = context.auth.token;
    const id = window.location.pathname.split("/").slice(-1)[0];
    useEffect(()=>{
      fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`,{ headers :{
            
        Authorization :"Bearer " +token,
      }})
      .then((res)=>res.json())
      .then((data)=>{
        setName(data[0].name);
        setEmail(data[0].email);
      })
    },[]);
  
    async function Submit(e) {
      e.preventDefault();
      setAccept(true);
      try {
        let res = await axios.post( `http://127.0.0.1:8000/api/user/update/${id}`, {
              name: name,
              email: email,
              password: password,
              password_confirmation: passwordR,
            },{ headers :{
            
              Authorization :"Bearer " +token,
            }});
            const userDetails =res.data.data.user;
            nav("/dashboard/users");
      } catch (err) {
       if(err.response.status===422 || err.response.status===401){
        setEmailerr(true)
       }
       setAccept(true)
      }
    }
    return(
      <div>
      <div>
        <div >
          <form onSubmit={Submit}>

          <label htmlFor="name"> name</label>
          <input
            type="text"
            id="name"
            placeholder="name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {name <2  && accept && (
            <p className="error"> user name is required </p>
          )}

          <label htmlFor="email"> email</label>
          <input
            type="email"
            id="email"
            placeholder="email..."
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {accept && emailerr && (
            <p className="error">this email is already has been taken </p>
          )}

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

          <label htmlFor="passwordR"> Repeatpassword</label>
          <input
            type="password"
            id="passwordR"
            placeholder="Repeatpassword..."
            value={passwordR}
            onChange={(e) => setPasswordR(e.target.value)}
          />
          {password !== passwordR && accept && (
            <p className="error">password does not match </p>
          )}
          <div style={{ textAlign: "center" }}>
              <button type="submit"> Update User </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  
    )
}