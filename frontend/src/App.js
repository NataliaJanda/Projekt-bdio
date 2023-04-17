import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";
import DashboardSite from './components/Dashboard/DashboardSite';
import PrivateRoute from "./components/PrivateRoute";
import Register from "./components/Register/Register";
import LoginPage from "./components/Login/LoginPage";


const App = () => {
    return (
      <Router>
        <Routes>
          <Route path = "/components/Dashboard" element = 
          {
          <PrivateRoute>
              <DashboardSite />
          </PrivateRoute>
          }/>

          <Route path = "/components/Register" element = {<Register />}/>
          <Route path = "/" element = {<DashboardSite />}/>
          <Route path = "/components/Login" element = {<LoginPage />}/> 

          </Routes>
      </Router>
 
    );
    };
    
    export default App;
    //<Route path = "/" element = {<DashboardSite />}/>