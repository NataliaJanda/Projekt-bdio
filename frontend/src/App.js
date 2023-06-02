import {  BrowserRouter as Router,  Routes,  Route,Navigate} from "react-router-dom";
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
import ViewSharedNote from "./components/Sharing/ViewSharedNote";
import ForbiddenPage from "./components/Forbidden/ForbiddenPage";
import jwt_decode from "jwt-decode";

const App = () => {
  const loggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("role");
  
  const checkTokenExpiration = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return;
    }
  
    const decodedToken =  jwt_decode(token);
    const expirationTime = decodedToken.exp * 1000; 
  
    if (Date.now() >= expirationTime) {
      logoutUser();
    }
  };
  const logoutUser = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("typeAccount");
    localStorage.removeItem("loginName");
    localStorage.removeItem("role");
    window.location.href = '/login';
  };

  setInterval(checkTokenExpiration, 60000); // Check every minute

  return (
      <Router>
        <Routes>
          <Route path = "/" element = {<DashboardSite/>} />
          <Route path = "/Dashboard" element = { loggedIn ?
            <PrivateRoute>
              <DashboardSite/>
            </PrivateRoute>
            :<LoginPage/>} />
          <Route path = "/Register" element = {loggedIn ? <DashboardSite/> :<Register />}/>
          <Route path = "/Login" element = {loggedIn ? <DashboardSite/> :<LoginPage />}/> 
          <Route path = "/AdminPage" element = {role && loggedIn ? <AdminPage/>:<LoginPage/>}/>
          <Route path = "/EditUser" element = {role && loggedIn ? <EditUser/>:<LoginPage/>}/>
          <Route path = "/AddUser" element = {role && loggedIn ? <AddUser/>:<LoginPage/>}/>
          <Route path = "/MoreInfoPage" element = {role && loggedIn ? <MoreInfoPage/>:<LoginPage/>}/>
          <Route path = "/RegisterSuccess" element = {<RegisterSuccess/>} />
          <Route path = "/Pricing" element = {<Pricing/>}/>
          <Route path="/components/share/:shortUrl" element={<ViewSharedNote  />}/>
          <Route path="/403" element={<ForbiddenPage/>} />
       </Routes>
      </Router>
 
    );
    };
    
    export default App;
