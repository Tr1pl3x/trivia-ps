// src/components/StartPage.js
import React from 'react';

const StartPage = ({ onStart }) => {
  return (
    <div className="start-page">
      <h1>How well do you know Pyae Sone?</h1>
      <p>Choose your difficulty:</p>
      <div className="difficulty-buttons">
        <button onClick={() => onStart('easy')}>
          I'm familiar with him (<strong>Easy</strong>)
        </button>
        <button onClick={() => onStart('normal')}>
          I think I know him pretty well (<strong>Normal</strong>)
        </button>
        <button onClick={() => onStart('hard')}>
          I am an expert about him (<strong>Hard</strong>)
        </button>
      </div>
    </div>
  );
};

export default StartPage;