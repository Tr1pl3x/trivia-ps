// src/components/HomePage.js
import React from 'react';

const HomePage = ({ onStart }) => {
  return (
    <div className="home-page">
      <h1>How well do you know Pyae Sone?</h1>
      <button onClick={onStart}>Start the Quiz</button>
    </div>
  );
};

export default HomePage;