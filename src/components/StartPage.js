import React from 'react';

const StartPage = ({ onStart }) => {
  return (
    <div className="start-page">
      <h1>Welcome to the Pyae Sone Trivia Quiz!</h1>
      <p>Choose your difficulty:</p>
      <div className="difficulty-buttons">
        <button onClick={() => onStart('easy')}>I'm familiar with him (Easy)</button>
        <button onClick={() => onStart('normal')}>I think I know him pretty well (Normal)</button>
        <button onClick={() => onStart('hard')}>I am an expert about him (Hard)</button>
      </div>
    </div>
  );
};

export default StartPage;