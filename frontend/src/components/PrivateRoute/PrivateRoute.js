import React from "react";
import { Navigate } from "react-router-dom";


const PrivateRoute = (props) =>{
    const tokken = localStorage.getItem("authToken");
    return tokken ? props.children: <Navigate to ="/components/Login"/>;
};
export default PrivateRoute;