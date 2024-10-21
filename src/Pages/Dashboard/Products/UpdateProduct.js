import {   useContext, useEffect, useState } from "react";
import axios from "axios";


import { useNavigate } from "react-router-dom";
import { User } from "../../Website/Context/Context";




export default function UpdateProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

const id =window.location.pathname.split("/").slice(-1)[0];
  const [accept, setAccept] = useState(false);
  const nav =useNavigate();
  const context = useContext(User);
  const token = context.auth.token;

  useEffect(() =>{
    axios.get(`http://127.0.0.1:8000/api/product/showbyid/${id}`,{
      headers :{
        Accept:"application/json",
        Authorization :"Bearer " +token,
      },
    })
    .then(data =>{
        console.log(data)
        setTitle(data.data[0].title);
        setDescription(data.data[0].description);}
    )
    .catch((err)=> console.log(err))
  },[]);

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);
    try {
   const formData= new FormData();
   formData.append("title",title);
   formData.append("description",description);
   formData.append("image",image);

      let res = await axios.post( `http://127.0.0.1:8000/api/product/update/${id}`,
        formData,{ headers :{
          
            Authorization :"Bearer " +token,
          },});
         
          nav("/dashboard/product");
    } catch (err) {
    
     setAccept(true)
    }
  }
  return (
    <div>
      <div>
        <div >
          <form onSubmit={Submit}>

          <label htmlFor="title"> title</label>
          <input
            type="text"
            id="title"
            placeholder="title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {title <""  && accept && (
            <p className="error"> title name is required </p>
          )}

          <label htmlFor="description"> description</label>
          <input
            type="text"
            id="description"
            placeholder="description..."
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {/* {accept && emailerr && (
            <p className="error">this email is already has been taken </p>
          )} */}

          <label htmlFor="image"> image</label>
          <input
            type="file"
            id="image"
            placeholder="image..."
       
            onChange={(e) => setImage(e.target.files.item(0))}
          />
          {/* {password.length < 8 && accept && (
            <p className="error">password must be more than 8 char</p>
          )} */}

        
          <div style={{ textAlign: "center" }}>
              <button type="submit" className="btn"> update Product </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
}
