import React from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetQuiz } from "../store/QuizSlice";

import { useEffect } from "react";

function Finished() {
  const { name, icon, darkMode } = useAppSelector((state) => state.home);
  const { score, questions } = useAppSelector((state) => state.quiz);
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const bgColors = {
    HTML: "#FFF1E9",
    CSS: "#E0FDEF",
    JavaScript: "#EBF0FF",
    Accessibility: "#F6E7FF",
  };

  const bgStyle = {
    backgroundColor: bgColors[name],
  };

  function playAgain() {
    dispatch(resetQuiz());
    
    navigate("/");
  }

  useEffect(() => {
    if (!name || !icon) {
      dispatch(resetQuiz());
      
      navigate("/");
    }
  }, [icon, name, dispatch, navigate]);

  return (
    <div className=" sm:mt-8 lg:gap-12 sm:gap-16 flex sm:flex-col lg:flex-row ">
      <div>
        <h2
          className={`sm:text-[4rem] lg:text-[4.2rem] font-light leading-[100%] transition-all duration-300 ${
            darkMode ? "text-white" : "text-blue-800"
          }`}
        >
          Quiz completed <br />
          <span className="font-medium">You scored...</span>
        </h2>
      </div>
      <div>
        <div
          className={`sm:rounded-[1.2rem] flex flex-col items-center gap-12  rounded-[2.4rem] p-9 transition-all duration-300 ${
            darkMode ? "bg-blue-800" : "bg-white"
          }`}
        >
          <div className="sm:gap-4 flex items-center lg:gap-12">
            <img
              src={icon}
              alt={name}
              className="h-[4rem] w-[4rem] p-2"
              
            />
            <p
              className={`sm:text-[1.8rem] text-[2.8rem] font-medium leading-[100%] transition-all duration-300 ${
                darkMode ? "text-white" : "text-blue-800"
              }`}
            >
              {name}
            </p>
          </div>
          <div className="flex flex-col items-center gap-6">
            <p
              className={`sm:text-[8.8rem] text-[14.4rem] font-medium leading-[100%] transition-all duration-300 ${
                darkMode ? "text-white" : "text-blue-800"
              }`}
            >
              {score}
            </p>
            <p
              className={`sm:text-[1.8rem] text-[2.4rem] leading-[150%] transition-all duration-300 ${
                darkMode ? "text-blue-300" : "text-blue-800"
              }`}
            >
              out of {questions.length}
            </p>
          </div>
        </div>
        <button
          className=" sm:text-[1.8rem] sm:p-7 sm:rounded-[1.2rem]  mt-10 w-96 rounded-[2.4rem] bg-purple-700 lg:p-[1.2rem] lg:text-[1.8rem] font-medium leading-[100%] text-white transition-all duration-300 sm:ml-6"
          onClick={playAgain}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

export default Finished;