import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import robot from "../assets/robot_futuristic.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
const navigate = useNavigate("")


  const robotRef = useRef(null);

  // Robot animation
  useEffect(() => {
    if (robotRef.current) {
      gsap.to(robotRef.current, {
        y: -20,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        duration: 2,
      });
    }
  }, []);



  return (
    <div className="h-[100vh] flex flex-col items-center justify-center text-center bg-gradient-to-b from-purple-900 to-black text-white px-4 sm:px-6 md:px-12 relative overflow-hidden">
      


      {/* Robot Image */}
      <motion.img
        ref={robotRef}
        src={robot}
        alt="AI Robot"
        className="w-[200px] sm:w-[260px] md:w-[340px] lg:w-[300px] drop-shadow-2xl z-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Heading */}
      <motion.h1
        className="text-2xl sm:text-3xl md:text-5xl font-bold mt-6 sm:mt-8 md:mt-0 z-10 leading-snug"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Your Personal AI Assistant
      </motion.h1>

      {/* Subtext */}
      <motion.p
        className="text-gray-400 mt-3 sm:mt-4 max-w-xs sm:max-w-md md:max-w-xl z-10 text-sm sm:text-base md:text-lg"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Ask questions, get instant answers, and explore the power of AI at your fingertips.
      </motion.p>

      {/* Get Started Button */}
      <motion.button
        onClick={() => navigate("/Chat")}  
        className="mt-6 cursor-pointer sm:mt-8 px-6 sm:px-8 py-2.5 sm:py-3 bg-cyan-500 text-black font-semibold rounded-full shadow-lg hover:bg-cyan-400 transition z-10 text-sm sm:text-base md:text-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        Get Started
      </motion.button>
    </div>
  );
};

export default Home;
