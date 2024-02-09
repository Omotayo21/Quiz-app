import React from 'react';

import { useAppDispatch, useAppSelector } from '../store';
import { useNavigate } from 'react-router-dom';
import { selectQuiz, selectIcon } from '../store/HomeSlice';


type TopicsProps = {
  img: string;
  text: string;
};

const Topics = ({ img, text} : TopicsProps) => {
    const { darkMode } = useAppSelector ((state) => state.home);
    const dispatch= useAppDispatch();
    const navigate = useNavigate()
    
    function setQuiz() {
      dispatch(selectQuiz(text));
      dispatch(selectIcon(img));
      navigate('/quiz')

    }
  return (
    <div>
      <li className= {`lg:ml-12 sm:ml-2 shadow-sm sm:rounded-[1.2rem] flex cursor-pointer sm:gap-6 lg:gap-12 items-center lg:rounded-[2.4rem] lg:p-8 sm:p-4 sm:w-[25rem] sm:h-[4rem] lg:w-[40rem] lg:h-[4.4rem] ${darkMode ? "bg-blue-800" : "bg-white"}`}
      onClick={setQuiz}>
        <img src={img} className='h-12 w-12 sm:p-2' />
         <p className={` sm:text-[1.3rem] transition-all duration-300 lg:text-[1.5rem] font-medium ${darkMode ? "text-white" : "text-black"}`}>{text}</p>
      </li>
    </div>
  )
}

export default Topics;
