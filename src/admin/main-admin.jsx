import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Bootstrap 4 for admin sections
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";

import MainLayout from "./layout/mainlayout";
import AdminDashboard from "./pages/AdminDashboard";
import Contracts from "./pages/Contracts";
import Users from "./pages/Users";
import Services from "./pages/Services";
import Profile from "./pages/Profile";
import ContractDetails from "./pages/ContractDetails";
import Err404 from "../404"; // Import the 404 component for unmatched routes

createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
  
      <Route path="/admin" element={<MainLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="contracts" element={<Contracts />} />
        <Route path="contract-details" element={<ContractDetails />} />
        <Route path="users" element={<Users />} />
        <Route path="profile" element={<Profile />} />
        <Route path="services" element={<Services />} />
        <Route path="*" element={<Err404 />} />{" "}
        {/* Handle unmatched admin routes */}
      </Route>
    </Routes>
  </Router>
);
