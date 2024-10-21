// import { useContext } from "react";
import {  NavLink } from "react-router-dom";



export default function SideBar(){
return(
    <div className="side_bar">
      <NavLink 
        to ="/dashboard/users" 
        className="item_link"> 
        <i className="fa-solid fa-users-line"></i>      
        users 
      </NavLink>
      <NavLink to ="/dashboard/user/create" 
        className="item_link"> 
        <i className="fa-solid fa-user-plus"></i>    
        new user
      </NavLink>

      <NavLink to ="/dashboard/product/" 
        className="item_link"> 
        <i className="fa-solid fa-brands fa-product-hunt"></i>    
        products
      </NavLink>
      <NavLink to ="/dashboard/product/create"
        className="item_link"> 
        <i className="fa-solid fa-plus"></i>    
        new product
      </NavLink>
    </div>
  )
}