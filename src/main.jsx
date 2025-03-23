import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Err404 from "./404";
import About from "./About";
import Appointment from "./Appointment";
import Contact from "./Contact";
import Feature from "./Feature";
import Index from "./Index";
import Service from "./Service";
import Team from "./Team";
import Testimonial from "./Testimonial";
import Login from "./pages/Login";
import Register from "./pages/Register";
import App from "./App";

import Auth from "./Auth";
import UserProfile from "./UserProfile"; // added this line
import UserContracts from "./UserContracts"; // added this line

createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Index />} />
        <Route path="about" element={<About />} />
        <Route path="appointment" element={<Appointment />} />
        <Route path="contact" element={<Contact />} />
        <Route path="feature" element={<Feature />} />
        <Route path="service" element={<Service />} />
        <Route path="team" element={<Team />} />
        <Route path="testimonial" element={<Testimonial />} />
        <Route path="profile" element={<UserProfile />} /> // added this line
        <Route path="profile/contracts" element={<UserContracts />} />{" "}
        {/* added this line */}
        <Route path="*" element={<Err404 />} /> {/* Handle unmatched routes */}
      </Route>
      <Route path="/auth/" element={<Auth />}>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  </Router>
);
