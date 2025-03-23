import "../public/css/style.css";
import Spinner from "./components/Spinner";
import Topbar from "./components/Topbar";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import AboutUs from "./components/AboutUs";
import AboutTeam from "./components/AboutTeam";
import FeatureUs from "./components/FeatureUs";
import Testimonial from "./components/TestimonialComp";
import Footer from "./components/Footer";
import BackTop from "./components/BackTop";

export default function Feature() {
  return (
    <>
   

   

      <Header title="Features" />

      <FeatureUs />

      <Testimonial />

      {/* Back to Top */}
      <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
        <i className="bi bi-arrow-up" />
      </a>
    </>
  );
}
