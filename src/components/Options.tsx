import React from "react";

import { useAppDispatch, useAppSelector } from "../store";
import { setChosenAnswer } from "../store/QuizSlice";

type OptionsProps = {
  option : string;
  optionIndex : number;
  userAnswer : string;
  setIsAnswered : any;
}

const Options = ({ option, optionIndex, userAnswer, setIsAnswered } : OptionsProps) => {
  const dispatch = useAppDispatch();
  const { darkMode } = useAppSelector((state) => state.home);
  const { chosenAnswer, correctAnswer } = useAppSelector((state) => state.quiz);

  const optionLetter = String.fromCharCode(65 + optionIndex);

  const chooseAnswer = () => {
    if (userAnswer !== "") return;
    dispatch(setChosenAnswer(option));
    setIsAnswered(false);
  };
  const answerCorrect = userAnswer === option && userAnswer === correctAnswer;
  const wrongAnswer = userAnswer === option && userAnswer !== correctAnswer;
  const isOptionChosen = chosenAnswer === option;
  return (
    <div className="mt-2 w-1/3  max-w-md mb-2">
      <button
        className={`group flex lg:w-[25rem] sm:w-[22rem] items-center lg:gap-12 rounded-[2.4rem] border-4 lg:px-1 lg:py-2 font-medium lg:text-[1.1rem] sm:text-[1.0rem] transition-all duration-300 md:gap-8 sm:rounded-[1.2rem] sm:px-5 sm:py-0.5 lg:leading-[100%]
        ${
          answerCorrect
            ? "cursor-not-allowed border-4 border-green-600"
            : wrongAnswer
            ? "cursor-not-allowed border-4 border-red-700"
            : isOptionChosen
            ? "border-4 border-purple-700"
            : userAnswer !== "" && option === correctAnswer
            ? "border-green-700"
            : "border-transparent hover:border-purple-700"
        }
        ${darkMode ? "bg-blue-700" : "bg-white"}`}
        onClick={chooseAnswer}
      >
        <span
          className={`inline-block rounded-xl lg:p-2 lg:ml-4 sm:p-3 sm:mr-1 sm:-ml-1 text-sm transition-all duration-300  ${
            answerCorrect
              ? "bg-green-700 text-white"
              : wrongAnswer
              ? "bg-red-700 text-white"
              : isOptionChosen
              ? "bg-purple-700 text-white"
              : userAnswer !== "" && option === correctAnswer
              ? "bg-green-700 text-white" 
              : userAnswer !== "" && option !== correctAnswer
              ? "bg-gray-100"
              : "bg-gray-700 text-white group-hover:bg-[#f6e7ff] group-hover:text-[#a729f5]"
          }`}
        >
          {optionLetter}
        </span>
        <span
          className={`font-medium lg:text-lg  ${
            darkMode ? "text-white" : "text-black"
          } `}
        >
          {option}
        </span>
      </button>
    </div>
  );
};

export default Options;
