// src/components/Layout.jsx
import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";
import Sidebar from "./Sidebar.jsx";
import { Button } from "./ui/button.jsx";

const Layout = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <div className="flex min-h-screen">
      {isAuthenticated && <Sidebar />}
      <div className="flex-1">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            My App
          </Link>
          {isAuthenticated ? (
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          ) : (
            <div className="space-x-4">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </header>
        <main className="p-6">
          <Outlet />
        </main>
        <footer className="bg-gray-100 p-4 text-center">Footer Content</footer>
      </div>
    </div>
  );
};

export default Layout;
