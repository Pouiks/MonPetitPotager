import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({role, children}) => {
    const userRole = localStorage.getItem('role');

        if(!userRole || userRole !== role) {

            return <Navigate to="/403" />

        } else {
            return children;
        }

}

export default ProtectedRoute;