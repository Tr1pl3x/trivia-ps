// src/components/HomePage.js
import React from 'react';

const HomePage = ({ onStart }) => {
  return (
    <div className="home-page">
      <h1>How well do you know Pyae Sone?</h1>

      {/* Display the GIF */}
      <div className="gif-container">
        <img src="/home.gif" alt="Welcome GIF" className="home-gif" />
      </div>

      <button onClick={onStart} className="start-button">
        Start the Quiz
      </button>
    </div>
  );
};

export default HomePage;