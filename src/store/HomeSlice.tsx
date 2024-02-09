import { createSlice, PayloadAction } from "@reduxjs/toolkit";
 

export type  Quiz = {
  title : string;
  icon : string;
  questions : [];
}
type HomeProps = {
  name : string;
  icon : string;
  quizzes : Quiz[];
  darkMode : boolean;
}
const initialState: HomeProps = {
  name: "",
  icon: "",
  quizzes: [],
  darkMode: false,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
    setQuizzes(state, action: PayloadAction<  Quiz[]>) {
      state.quizzes = action.payload;
    },
    selectQuiz(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    selectIcon(state, action: PayloadAction<string>) {
      state.icon = action.payload;
    },
  },
});

export const {setDarkMode, setQuizzes, selectQuiz, selectIcon} = homeSlice.actions;
export default homeSlice.reducer;