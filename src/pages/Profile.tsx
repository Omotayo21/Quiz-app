
import React , {useEffect}from 'react';

import { useAppSelector, useAppDispatch } from '../store';
import { addScore } from '../store/QuizSlice';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { scores } = useAppSelector((state) => state.quiz);
  const { darkMode, name } = useAppSelector((state) => state.home);

  function back() {
    navigate("/");
  }
  // Save scores to local storage whenever scores change
 useEffect(() => {
    console.log(localStorage);
    const serializedScores = JSON.stringify(scores.map((score) => ({ quiz: score.quiz, score: score.score })));
    localStorage.setItem("UserScores", serializedScores);
  }, [scores]);

/* useEffect(() => {
   const storedScores = localStorage.getItem("UserScores");
   if (storedScores) {
     const parsedScores = JSON.parse(storedScores);
     dispatch(addScore(parsedScores));
     console.log(parsedScores)
   }
 }, [dispatch]);*/


  return (
    <div className="container mx-auto mt-8 p-4">
      <div className="text-center mb-6">
        <h2
          className={`text-3xl font-semibold ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Your Profile
        </h2>
        <p
          className={`text-gray-600 ${darkMode ? "text-white" : "text-black"}`}
        >
          Check out your previous quiz scores!
        </p>
      </div>

      <div className="max-w-md mx-auto bg-white rounded-md shadow-md overflow-hidden">
        <div className="bg-purple-600 text-white py-3 px-4">
          <h3 className="text-lg font-semibold">Quiz Leaderboard</h3>
        </div>

        <ul className="divide-y divide-gray-300">
          {scores.map((score, index) => (
            <li key={index} className="p-4">
              <div className="mb-2">
                <span className="font-semibold">{score.quiz}</span>
              </div>
              <ul className="divide-y divide-gray-300">
                <li
                  key={index}
                  className="flex items-center justify-between py-1"
                >
                  <span className="text-sm font-semibold">
                    {score.score}/10
                  </span>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <button
        className="w-96 bg-purple-900 text-center sm:-ml-12 lg:ml-[27rem] mt-12 rounded-[1.2rem] h-16 border-2 text-white border-white"
        onClick={back}
      >
        Back to home page
      </button>
    </div>
  );
};

export default ProfilePage;
/*
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    // Load scores from local storage on component mount (if any)
    const storedScores = localStorage.getItem("UserScores");
    if (storedScores) {
      const parsedScores = JSON.parse(storedScores);
      console.log("Parsed Scores:", parsedScores);
      setScores(parsedScores);
    }
  }, []);

  const saveToLocalStorage = () => {
    const updatedScores = [...scores, { quiz: "TestQuiz", score: 8 }];
    localStorage.setItem("UserScores", JSON.stringify(updatedScores));
    setScores(updatedScores);
  };

  return (
    <div>
      <h1>Your Profile</h1>
      <button onClick={saveToLocalStorage}>Save to Local Storage</button>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>{`${score.quiz}: ${score.score}/10`}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProfilePage;*/

