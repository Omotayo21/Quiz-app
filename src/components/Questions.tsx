import React from "react";
import Header from "./Header";

import { useAppSelector } from "../store";

type QuestionProps = {
  question : any;
}

const Question = ({ question } : QuestionProps) => {
  const { index, questions } = useAppSelector((state) => state.quiz);
  const { darkMode } = useAppSelector((state) => state.home);
  return (
    <div className="lg:mt-20">
      <Header />
      <div className=" lg:w-2/3 sm:text-[0.8rem] mb-4 lg:mb-0 flex flex-row sm:ml-4 lg:mt-4 ">
        <div>
          <p className={`italic ${darkMode ? "text-white" : "text-black"} `}>
            Question {index + 1} of {questions.length}
          </p>
          <br />
          <h1
            className={`font-medium text-[1.6rem] leading-tight transition-all duration-300 mobile:text-[2rem]  ${
              darkMode ? "text-white" : "text-black"
            } `}
          >
            {" "}
            {question?.question}{" "}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Question;
