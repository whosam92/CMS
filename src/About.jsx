import "../public/css/style.css";
import Spinner from "./components/Spinner";
import Topbar from "./components/Topbar";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import AboutUs from "./components/AboutUs";
import AboutTeam from "./components/AboutTeam";
import Footer from "./components/Footer";
import BackTop from "./components/BackTop";

export default function About() {
  return (
    <>
    
      <Header title="About Us" />

      <AboutUs />

      <AboutTeam />

     
    </>
  );
}