import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";
import DashboardSite from './components/Dashboard/DashboardSite';
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./components/Register/Register";
import { useState } from "react";


const App = () => {
  
  const [currentForm, setCurrentForm] = useState("login")
    const toggleForm = (formName) =>
    {
      setCurrentForm(formName);
    }
    return (
      <Router>
        <Routes>
          <Route path = "/components/Dashboard" element = 
          {
          //<PrivateRoute>
            <DashboardSite />
          //</PrivateRoute>
          }/>
          <Route path = "/" element = {<Login />} />
          <Route path = "/components/Register" element = {<Register />}/>
        </Routes>
      </Router>
 
    );
    };
    
    export default App;