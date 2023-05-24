import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";
import DashboardSite from './components/Dashboard/DashboardSite';
import Register from "./components/Register/Register";
import LoginPage from "./components/Login/LoginPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AdminPage from "./components/AdminPage/AdminPage";
import EditUser from "./components/AdminPage/EditUser";
import AddUser from "./components/AdminPage/AddUser";
import MoreInfoPage from "./components/AdminPage/MoreInfoPage";
import RegisterSuccess from "./components/Register/RegisterSuccess";
import Pricing from "./components/Pricing/Pricing";
import UserSettings from "./components/UserSettings/UserSettings";

const App = () => {
  const loggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("role");
  return (
      <Router>
        <Routes>
          <Route path = "/" element = {<DashboardSite/>} />
          <Route path = "/components/Dashboard" element = { loggedIn ?
            <PrivateRoute>
              <DashboardSite/>
            </PrivateRoute>
            :<LoginPage/>} />
          <Route path = "/components/Register" element = {loggedIn ? <DashboardSite/> :<Register />}/>
          <Route path = "/components/Login" element = {loggedIn ? <DashboardSite/> :<LoginPage />}/> 
          <Route path = "/components/AdminPage" element = {role && loggedIn ? <AdminPage/>:<LoginPage/>}/>
          <Route path = "/components/EditUser" element = {role && loggedIn ? <EditUser/>:<LoginPage/>}/>
          <Route path = "/components/AddUser" element = {role && loggedIn ? <AddUser/>:<LoginPage/>}/>
          <Route path = "/components/MoreInfoPage" element = {role && loggedIn ? <MoreInfoPage/>:<LoginPage/>}/>
          <Route path = "/components/RegisterSuccess" element = {<RegisterSuccess/>} />
          <Route path = "/components/Pricing" element = {<Pricing/>}/>
          <Route path = "/components/Settings" element = {<UserSettings/>}/>

       </Routes>
      </Router>
 
    );
    };
    
    export default App;
