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
import UserSettings from "./components/UserSettings/UserSettings";
import ViewSharedNote from "./components/Sharing/ViewSharedNote";
import ForbiddenPage from "./components/Forbidden/ForbiddenPage";

const App = () => {
  const loggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("role");

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
          <Route path = "/Settings" element = {<UserSettings/>}/>
          <Route path="/components/share/:shortUrl" element={<ViewSharedNote  />}/>
          <Route path="/403" element={<ForbiddenPage/>} />
       </Routes>
      </Router>
 
    );
    };
    
    export default App;
