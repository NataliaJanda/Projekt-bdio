import React, { useState } from 'react';
import {Navigate} from "react-router-dom";


const PrivateRoute = ({children}) => {
    
    const [jwt,setJwt] = useState("","jwt");
    return jwt ? <Navigate to="/components/login" /> : children;

};

export default PrivateRoute;