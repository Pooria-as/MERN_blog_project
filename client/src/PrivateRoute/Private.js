import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Private = ({ children }) => {
  const { user: isAuthenticated } = useSelector((x) => x.auth);

  if (!isAuthenticated) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/login" />;
  }

  // authorized so return child components
  return children;
};

export default Private;
