// src/pages/auth/Register.jsx
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext.jsx"; // Fixed path
import { Button } from "../../components/ui/button.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Label } from "../../components/ui/label.jsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card.jsx";

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = () => {
    login("fake-token"); // Fake register
    navigate("/dashboard");
  };

  return (
    <Card className="max-w-md mx-auto mt-20">
      <CardHeader>
        <CardTitle>Register</CardTitle>
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
          <div>
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm your password"
            />
          </div>
          <Button onClick={handleRegister} className="w-full">
            Register
          </Button>
          <p className="text-center">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Register;
