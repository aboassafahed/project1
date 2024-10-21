import { Route, Router, Routes } from "react-router-dom";
/*Website*/ 
import Home from "./Pages/Website/Home";
import About from "./Pages/Website/About";
/*Auth */
import SignUp from "./Pages/Website/Auth/SignUp";
import Login from "./Pages/Website/Auth/Login";
/*Dashboard */
import Dashboard from "./Pages/Dashboard/Dashboard";
/*Users */
import Users from "./Pages/Dashboard/Users/Users";
import CreateUser from "./Pages/Dashboard/Users/CreateUser";
import UpdateUser from "./Pages/Dashboard/Users/UpdateUser";
import RequireAuth from "./Pages/Website/Auth/RequireAuth";
import PresistLog from "./Pages/Website/Auth/PresistLogin";
import NewProduct from "./Pages/Dashboard/Products/NewProduct";
import Product from "./Pages/Dashboard/Products/Product";
import UpdateProduct from "./Pages/Dashboard/Products/UpdateProduct";


export default function App(){
  return(
    <div>
      <Routes>
        <Route path="/" element={  <Home/>}/>
        <Route path="/about" element={  <About/>}/>
        <Route path="/signup" element={  <SignUp/>}/>
        <Route path="/login" element={  <Login/>}/>
          {  /*protected Routes */}
          <Route element={<PresistLog/>}>
            <Route element ={<RequireAuth/>}>
              <Route path="/dashboard" element={  <Dashboard/>}>
                <Route path="users" element={<Users/>}/>
                <Route path="user/create" element ={<CreateUser/>}/>
                <Route path="users/:id" element ={<UpdateUser/>}/>
                <Route path="product" element ={<Product/>}/>
                <Route path="product/create" element ={<NewProduct/>}/>
                <Route path="product/:id" element ={<UpdateProduct/>}/>
              </Route>
            </Route>
          </Route>
        </Routes>
    </div>
  )
}