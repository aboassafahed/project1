import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { User } from "../../Website/Context/Context";

export default function Product(){
  const [products ,setProducts] =useState([]);
  const [runUseEffect ,setRun] = useState(0);
  const context = useContext(User);
  const token = context.auth.token;
  
  useEffect(() =>{
    axios.get("http://127.0.0.1:8000/api/product/show",{
      headers :{
        Accept:"application/json",
        Authorization :"Bearer " +token,
      },
    })
    .then(data =>setProducts(data.data))
    .catch((err)=> console.log(err))
  },[runUseEffect]);

  const showProducts= products.map((product, index) =>(
      <tr key={index}>
        <td>{index+1}</td>
        <td>{product.title}</td>
        <td>{product.description}</td>
        <td>
        <Link to ={`${product.id}`}>
        <i className="fa-solid fa-pen-to-square" 
         style={{color:"@74afb9" ,fontSize:"20px",paddingRight:"4px" }}></i>
        </Link>
        <i className="fa-solid fa-trash"
         onClick={() => deleteProduct(product.id)} 
         style={{color:"red" ,fontSize:"20px",cursor:"pointer" }}></i>
        </td>
      </tr>
  ));
   async function deleteProduct(id){
    try{
      const res= await axios.delete(
        `http://127.0.0.1:8000/api/product/delete/${id}`,{
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
              <th>title</th>
              <th>description</th>
              <th>action</th>
           </tr>
        </thead>
        <tbody>
            {showProducts}
        </tbody>
      </table>

    </div>
  );
}