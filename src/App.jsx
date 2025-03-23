import React from "react";
import Spinner from "./components/Spinner";
import Topbar from "./components/Topbar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackTop from "./components/BackTop";
import { Outlet } from "react-router-dom"; // For rendering pages

const App = () =>{
    return (
        <>
         <Topbar />
         <Navbar />
         <Outlet />
         <Footer />
        </>
      );
}
export default App ;