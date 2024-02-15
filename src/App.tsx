import "./index.css";

import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("./pages/HomePage"));
const Profile = lazy(() => import("./pages/Profile"));
const Error = lazy(() => import("./pages/Error"));
const QuizPage = lazy(() => import("./pages/QuizPage"));
const Finished = lazy(() => import("./pages/Finished"));

import Toggle from "./components/Toggle";

import { useAppDispatch, useAppSelector } from "./store";

import darkImageDesktop from "./assets/images/pattern-background-desktop-dark.svg";
import lightImageDesktop from "./assets/images/pattern-background-desktop-light.svg";
import darkImageTablet from "./assets/images/pattern-background-tablet-dark.svg";
import lightImageTablet from "./assets/images/pattern-background-tablet-light.svg";

import { addScore } from "./store/QuizSlice";

const App = () => {
  const { darkMode } = useAppSelector((state) => state.home);
  //const { addScore } = useAppDispatch((state ) => state.quiz)
  const dispatch = useAppDispatch();
  useEffect(() => {
    // Load scores from local storage on component mount (if any)
    const storedScores = localStorage.getItem("UserScores");
    if (storedScores) {
      const parsedScores = JSON.parse(storedScores);
      dispatch(addScore(parsedScores));
    }
  }, [dispatch]);

  return (
    <>
      <div className="w-full absolute inset-0">
        {!darkMode && (
          <>
            <img
              src={lightImageDesktop}
              alt="Light Mode Desktop Background"
              className="hidden lg:block w-full h-full object-cover transition-opacity duration-300 bg-black bg-opacity-20"
            />
            <img
              src={lightImageTablet}
              alt="Light Mode small Background"
              className="block lg:hidden w-full h-full object-cover transition-opacity duration-300 bg-black bg-opacity-20"
            />
          </>
        )}

        {/* Dark mode images */}
        {darkMode && (
          <>
            <img
              src={darkImageDesktop}
              alt="Dark Mode Desktop Background"
              className="hidden lg:block w-full h-full object-cover transition-opacity duration-300 bg-black bg-opacity-90"
            />
            <img
              src={darkImageTablet}
              alt="Dark Mode Tablet Background"
              className="block lg:hidden w-full h-full object-cover transition-opacity duration-300 bg-black bg-opacity-90"
            />
          </>
        )}
        <div className="absolute inset-0 ">
          <Router>
            <Suspense
              fallback={<div className="text-center text-black">Loading</div>}
            >
              <Routes>
                <Route
                  path="/*"
                  element={
                    <div>
                      <Toggle />
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/quiz" element={<QuizPage />} />

                        <Route path="/profile" element={<Profile />} />
                        <Route path="/finished" element={<Finished />} />
                        <Route path="/*" element={<Error />} />
                      </Routes>
                    </div>
                  }
                />
              </Routes>
            </Suspense>
          </Router>
        </div>
      </div>
    </>
  );
};

export default App;
