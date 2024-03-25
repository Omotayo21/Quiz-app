import React, { useState } from "react";

import { setDarkMode } from "../store/HomeSlice";

import { useAppDispatch, useAppSelector } from "../store";
import img1 from "../assets/images/icon-sun-dark.svg";
import img2 from "../assets/images/icon-sun-light.svg";
import img3 from "../assets/images/icon-moon-light.svg";
import img4 from "../assets/images/icon-moon-dark.svg";
import { User } from "phosphor-react";
import { useNavigate } from "react-router-dom";

const Toggle = () => {
  const { darkMode } = useAppSelector((state) => state.home);
  const [theme, setTheme] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function toggleTheme() {
    setTheme((prevTheme) => !prevTheme);
    dispatch(setDarkMode());
  }
  return (
    <>
      <div className=" sm:ml-40 lg:ml-[68rem] mt-4 lg:mb-8">
        <div className="flex items-center gap-6">
          {darkMode ? (
            <img src={img2} alt=" black sun icon" />
          ) : (
            <img src={img1} alt="sun icon" />
          )}
          <label
            htmlFor="toggle"
            className={`relative block h-[2.5rem] w-[7rem] cursor-pointer rounded-full bg-purple-600 before:absolute before:left-2 before:top-[2px] before:h-[2rem] before:w-[2rem] before:rounded-full before:bg-white before:transition-all before:duration-300 ${
              theme ? "before:translate-x-full" : "before:translate-x-0"
            }`}
          >
            <input
              type="checkbox"
              id="toggle"
              className="hidden"
              checked={theme}
              onChange={toggleTheme}
            />
            <div></div>
          </label>
          {darkMode ? (
            <img src={img3} alt="moon icon" />
          ) : (
            <img src={img4} alt="moon icon" />
          )}
          <User
            size={48}
            className=" cursor-pointer rounded-full text-black-900 bg-white p-2"
            onClick={() => {
              navigate("/profile");
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Toggle;
