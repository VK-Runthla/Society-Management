import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slice/auth"; // Removed .jsx extension
import { AuthContext } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const auth = useSelector((state) => state.auth); // Select auth slice specifically

  console.log("Auth State ----->>>> ", auth);

  // Redirect to dashboard if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Show loading state
  if (auth.isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Button onClick={() => dispatch(login())}>Log In</Button>
      {auth.data && Array.isArray(auth.data) && auth.data.length > 0 ? (
        <ul>
          {auth.data.map((item) => (
            <li key={item.id || item.title}>{item.title}</li> // Use a unique key
          ))}
        </ul>
      ) : (
        <p>No data available</p> // Fallback for no data
      )}
    </div>
  );
};

export default Home;
