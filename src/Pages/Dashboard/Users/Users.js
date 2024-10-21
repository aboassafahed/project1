import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { User } from "../../Website/Context/Context";

export default function Users(){
  const [users ,setUsers] =useState([]);
  const [runUseEffect ,setRun] = useState(0);
  const context = useContext(User);
  const token = context.auth.token;
  useEffect(() =>{
    axios.get("http://127.0.0.1:8000/api/user/show",{
      headers :{
        Accept:"application/json",
        Authorization :"Bearer " +token,
      },
    })
    .then(data =>setUsers(data.data))
    .catch((err)=> console.log(err))
  },[runUseEffect]);

  const showUsers= users.map((user, index) =>(
      <tr key={index}>
        <td>{index+1}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>
        <Link to ={`${user.id}`}>
        <i className="fa-solid fa-pen-to-square" 
         style={{color:"@74afb9" ,fontSize:"20px",paddingRight:"4px" }}></i>
        </Link>
        <i className="fa-solid fa-trash"
         onClick={() => deleteUser(user.id)} 
         style={{color:"red" ,fontSize:"20px",cursor:"pointer" }}></i>
        </td>
      </tr>
  ));
   async function deleteUser(id){
    try{
      const res= await axios.delete(
        `http://127.0.0.1:8000/api/user/delete/${id}`,{
          headers :{
          
            Authorization :"Bearer " +token,
          },
        } );
    if(res.status ===200){
      setRun((prev) =>prev+1)}
    }
    catch{
      console.log("none")
    }}

 
  
  return(
    <div style={{padding:"20px"}}>
      <table>
        <thead>
           <tr>
            <th>id</th>
              <th>user</th>
              <th>email</th>
              <th>action</th>
           </tr>
        </thead>
        <tbody>
            {showUsers}
        </tbody>
      </table>

    </div>
  );
}