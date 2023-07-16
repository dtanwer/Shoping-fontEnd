import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
const Protected = ({ children }) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.login)
  // const user = useSelector((state) => state.auth.user)
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default Protected;