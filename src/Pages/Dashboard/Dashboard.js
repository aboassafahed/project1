import { Outlet} from "react-router-dom";
import SideBar from "../../Component/SideBar";
import TopBar from "../../Component/TopBar";
import "./dashboard.css";

export default function Dashboard(){
  return(
  <div>
    <TopBar/>
    <div className="content_flex">
     <SideBar/>
     <div style={{width:"80%"}}>
      <Outlet/>
     </div>
    </div>
  
  </div>)
}