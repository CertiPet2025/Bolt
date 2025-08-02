import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertTriangle, Home } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'breeder' | 'buyer' | 'admin';
  allowedRoles?: ('breeder' | 'buyer' | 'admin')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole, 
  allowedRoles 
}) => {
  const { user, isAuthenticated } = useAuth();

  // If not authenticated, redirect to home
  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  // Check if user has required role
  const hasRequiredRole = requiredRole ? user.type === requiredRole : true;
  const hasAllowedRole = allowedRoles ? allowedRoles.includes(user.type) : true;

  if (!hasRequiredRole || !hasAllowedRole) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-black mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You don't have permission to access this page. This area is restricted to authorized personnel only.
          </p>
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6">
            <p className="text-red-800 text-sm">
              <strong>Error 403:</strong> Forbidden - Insufficient privileges
            </p>
          </div>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-[#A8E6CF] text-black px-6 py-3 rounded-lg hover:bg-[#70C1B3] transition-colors font-medium flex items-center mx-auto"
          >
            <Home className="w-5 h-5 mr-2" />
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;