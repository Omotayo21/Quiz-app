import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type Question = {
  options?: string[] ;
  answer : string ;
  question : string;
  
}
export type QuizScore = {
  quiz: string;
  score: number;
};

type QuizStateProps = {
  index: any ;
  score: number;
  correctAnswer: string;
  chosenAnswer: string;
  questions: Question[];
  scores: { quiz: string; score: number }[];
};


const initialState : QuizStateProps = {
  index: 0,
  score: 0,
  correctAnswer: "",
  chosenAnswer: "",
  questions: [],
  scores:[]
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setIndex(state) {
      state.index++;
    },
    setScore(state) {
      state.score++;
    },
    setCorrectAnswer(state, action : PayloadAction<string>) {
      state.correctAnswer = action.payload;
    },
    setChosenAnswer(state, action : PayloadAction<string>) {
      state.chosenAnswer = action.payload;
    },
    setQuestions(state, action : PayloadAction<Question[]>) {
      state.questions = action.payload;
    },
    resetQuiz(state) {
      state.index = initialState.index;
      state.score = initialState.score;
      state.correctAnswer = initialState.correctAnswer;
      state.chosenAnswer = initialState.chosenAnswer;
      state.questions = initialState.questions
    },
    addScore(state, action : PayloadAction<{ quiz: string; score: number }[]>) {
      state.scores = action.payload;
    },
  },
});


export const {setIndex, setChosenAnswer, setCorrectAnswer, setQuestions, setScore, resetQuiz, addScore} = quizSlice.actions;
export default quizSlice.reducer;
