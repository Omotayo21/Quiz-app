import { configureStore } from "@reduxjs/toolkit";
//import todoSlice from "./todo-slice";
import homeReducer from './HomeSlice'
import quizReducer from './QuizSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";



const store = configureStore({
    reducer: {
         home: homeReducer,
         quiz: quizReducer,
      
    },
});

export default store;
export const useAppDispatch : ()=> typeof store.dispatch = useDispatch;
export const useAppSelector : TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;