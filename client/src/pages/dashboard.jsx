// src/pages/Dashboard.jsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card.jsx";

const Dashboard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Dashboard</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Welcome to your protected dashboard!</p>
      {/* Add content here */}
    </CardContent>
  </Card>
);

export default Dashboard;
