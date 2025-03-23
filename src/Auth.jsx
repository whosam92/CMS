import React from "react";
import Spinner from "./components/Spinner";
import Topbar from "./components/Topbar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BotFooter from "./components/BotFooter";
import { Outlet } from "react-router-dom"; // For rendering pages

const App = () =>{
    return (
        <>
         <Topbar />
         <Navbar />
         <Outlet />
         <BotFooter />
        </>
      );
}
export default App ;