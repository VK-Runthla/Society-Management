// src/pages/auth/Login.jsx
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { Button } from "../../components/ui/button.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Label } from "../../components/ui/label.jsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card.jsx";

const Login = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  // Debug: Check if context is defined
  if (!context) {
    throw new Error(
      "AuthContext is undefined. Ensure AuthProvider wraps the app."
    );
  }

  const { login } = context;

  const handleLogin = () => {
    try {
      login("fake-token");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-20">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <Button onClick={handleLogin} className="w-full">
            Login
          </Button>
          <p className="text-center">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Login;
