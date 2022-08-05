import React from "react";
import { FaBriefcaseMedical, FaLock, FaMousePointer } from "react-icons/fa";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

const Home = () => {
  const icons = [FaBriefcaseMedical, FaLock, FaMousePointer];
  return (
    <>
      <Navbar />
      <Hero />
      <Footer />
    </>
  );
};

export default Home;
