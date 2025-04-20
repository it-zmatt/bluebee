import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const user = localStorage.getItem('user'); // or check for a token like localStorage.getItem('access_token')

    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
