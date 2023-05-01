import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";
import DashboardSite from './components/Dashboard/DashboardSite';
import Register from "./components/Register/Register";
import LoginPage from "./components/Login/LoginPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AdminPage from "./components/AdminPage/AdminPage";
import EditUser from "./components/AdminPage/EditUser";
import AddUser from "./components/AdminPage/AddUser";
import Home from "./components/AdminPage/Home";



const App = () => {
  const loggedIn = localStorage.getItem("isLoggedIn");
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
          <Route path = "/components/AdminPage" element = {loggedIn ? <AdminPage/>:<AdminPage/>}/>
          <Route path = "/components/EditUser" element = {loggedIn ? <EditUser/>:<EditUser/>}/>
          <Route path = "/components/AddUser" element = {loggedIn ? <AddUser/>:<AddUser/>}/>
          <Route path = "/components/Home" element = {loggedIn ? <Home/>:<Home/>}/>
       </Routes>
      </Router>
 
    );
    };
    
    export default App;
    //<Route path = "/" element = {<DashboardSite />}/>