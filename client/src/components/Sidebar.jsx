// src/components/Sidebar.jsx
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu.jsx";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <NavigationMenu orientation="vertical">
        <NavigationMenuList className="flex flex-col space-y-2">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/dashboard" className="block p-2 hover:bg-gray-700">
                Dashboard
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/profile" className="block p-2 hover:bg-gray-700">
                Profile
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Sidebar;
