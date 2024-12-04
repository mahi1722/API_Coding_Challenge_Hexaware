import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, jwt }) {
  if (!jwt) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;
