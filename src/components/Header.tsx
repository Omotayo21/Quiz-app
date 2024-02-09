import React from "react";

import { useAppSelector } from "../store";

const Header = () => {
  //const navigate = useNavigate();
  //const dispatch = useAppDispatch();
  const { name, icon, darkMode } = useAppSelector((state) => state.home);

  return (
    <div className=" flex flex-row">
      <div
        className={`sm:gap-6 sm:mt-[0.1rem] flex items-center lg:gap-12 lg:-mt-16 ${
          !name ? "opacity-0" : "opacity-100"
        }`}
      >
        {" "}
        <img src={icon} alt={name} className="h-[4rem] w-[4rem] p-2" />
        <p
          className={`sm:text-[1.8rem] text-[2.8rem] font-medium leading-[100%] transition-all duration-300 ${
            darkMode ? "text-white" : "text-blue-700"
          }`}
        >
          {name}
        </p>
      </div>
    </div>
  );
};

export default Header;
