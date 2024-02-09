import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAppSelector } from "../store";

const CountdownTimer = ({ initialTime = 300 }) => {
  const { darkMode } = useAppSelector((state) => state.home);
  const [time, setTime] = useState(initialTime);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    // Clear the timer when the component unmounts
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Show notification and navigate when the timer reaches 0
    if (time === 0) {
      toast.error("Time's up!");
      setTimeout(() => {
        navigate("/finished");
      }, 2000); // Wait for 2 seconds before navigating
    }
  }, [time, navigate]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div>
      <p
        className={`font-medium ml-12 lg:text-xl sm:mt-4 sm:text-sm  ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        Time Remaining: {minutes} min {seconds} sec
      </p>
      <ToastContainer />
    </div>
  );
};

export default CountdownTimer;
