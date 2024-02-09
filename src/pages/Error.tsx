import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();
  function back() {
    navigate("/")
  }
  return (
    <div className="flex flex-row items-center justify-center">
      <h2> Ooops, sorry something must have gone wrong</h2>
      <button
        className="w-96 bg-purple-900 text-center sm:-ml-12 lg:ml-[27rem] mt-12 rounded-[1.2rem] h-16 border-2 text-white border-white"
        onClick={back}
      >
        Back to home page
      </button>
    </div>
  );
}

export default Error
