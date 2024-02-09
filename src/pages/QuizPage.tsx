import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store';
import Question from '../Components/Questions';
import { useDispatch, useSelector } from 'react-redux';
import Options from '../Components/Options';
import { resetQuiz } from '../store/QuizSlice';
import CountdownTimer from '../Components/CountdownTimer';
import {
  setChosenAnswer,
  setCorrectAnswer,
  setIndex,
  setScore,
  setQuestions,
  addScore,
} from '../store/QuizSlice';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, X } from 'phosphor-react';

const QuizPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isPopUp, setIsPopUp] = useState(false);
  const { name, quizzes } = useAppSelector(state => state.home);
  const { questions, index, correctAnswer, chosenAnswer, score, scores } = useAppSelector(
    (state) => state.quiz
  );
  const selectedQuizData = quizzes.find((item) => item.title === name);

  useEffect(() => {
    if (selectedQuizData) {
      dispatch(setQuestions(selectedQuizData.questions));
    }
  }, [dispatch, selectedQuizData]);

  // for options part
  const [userAnswer, setUserAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);

  const submitAnswer = () => {
    if (chosenAnswer === "") setIsAnswered(true);
    setUserAnswer(chosenAnswer);
  };

  const nextQuestion = () => {
    

    if (userAnswer === correctAnswer){ 
      
      dispatch(setScore());

    }
    
    //const updatedScores = [...scores, { quiz: name, score: currentScore }];
    //dispatch(addScore(updatedScores));
    dispatch(setIndex( index + 1)); // Increment index to move to the next question
    dispatch(setChosenAnswer(""));
    setIsAnswered(false);
    setUserAnswer("")
  };

  const finishedQuiz = () => {
    if (userAnswer === correctAnswer) {
      dispatch(setScore());
    }
    const updatedScores = [...scores, { quiz: name, score: score }];
    dispatch(addScore(updatedScores));
    navigate("/finished");
  };

  useEffect(() => {
    dispatch(setCorrectAnswer(questions[index]?.answer));
  }, [questions[index]?.answer, dispatch]);
 const back = () => {
  setIsPopUp(true)
   
 };
 const yes = () => {
   dispatch(resetQuiz());
   navigate("/");
 }
 const close = () =>{
   setIsPopUp(false)
 }
 
  return (
    <>
      {isPopUp && (
        <div className=" flex flex-col items-center  w-96 h-48 bg-white mt-12 sm:ml-4 lg:ml-[30rem]">
          <X size={20} onClick={close} className="ml-[20rem] mt-4" />
          <br />
          <p> Are you sure you want to quit quiz</p>
          <br />
          <div className="flex flex-row gap-8">
            <button
              onClick={yes}
              className="bg-purple-900 text-center rounded-[1.2rem] h-12 w-12 border-2 text-white"
            >
              yes
            </button>
            <button
              onClick={close}
              className="bg-purple-900 text-center rounded-[1.2rem] h-12 w-12 border-2 text-white"
            >
              no
            </button>
          </div>
        </div>
      )}
      <div className={`${isPopUp && "blur-lg"}`}>
        <ArrowLeft
          size={28}
          className="bg-white rounded-full p-1 lg:-mt-16 ml-4"
          onClick={back}
        />
        <div
          className={`flex flex-col justify-between items-start lg:flex-row 
         `}
        >
          {questions.length > 0 && index < questions.length && (
            <Question key={index} question={questions[index]} />
          )}

          <div className="lg:space-y-5 sm:space-y-5 flex flex-col  sm:mr-4 lg:mr-8 sm:ml-2 lg:mt-8">
            {questions[index]?.options?.map((item, optionIndex) => (
              <Options
                key={item}
                option={item}
                optionIndex={optionIndex}
                userAnswer={userAnswer}
                setIsAnswered={setIsAnswered}
              />
            ))}
          </div>
        </div>
        <CountdownTimer initialTime={300} />
        <div className="sm:mt-8 lg:-mt-8 absolute right-4 ">
          {userAnswer === "" && (
            <button
              className="w-72 bg-purple-900 text-center rounded-[1.2rem] h-16 border-2 text-white border-white"
              onClick={submitAnswer}
            >
              Submit Answer
            </button>
          )}
          {userAnswer !== "" && index < questions.length - 1 ? (
            <button
              className="w-72 bg-purple-900 text-center rounded-[1.2rem] h-16 border-2 text-white border-white"
              onClick={nextQuestion}
            >
              Next Question
            </button>
          ) : (
            userAnswer !== "" && (
              <button
                className="w-72 bg-purple-900 text-center rounded-[1.2rem] h-16 border-2 text-white border-white"
                onClick={finishedQuiz}
              >
                Finished Quiz
              </button>
            )
          )}

          <div
            className={`mt-2 flex items-center justify-center gap-8 ${
              isAnswered ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src="/icon-incorrect.svg" alt="incorrect icon" />
            <p className="text-[1.5rem] leading-[150%] text-red sm:text-[1rem]">
              Please select an answer
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizPage;
