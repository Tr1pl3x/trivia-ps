import React from 'react';

const ResultPage = ({ score, difficulty, onRetry }) => {
  let prompt;
  if (difficulty === 'hard' && score < 3) {
    prompt = "You said you were an expert but damn! You know nothing about him!";
  } else if (difficulty === 'normal' && score < 3) {
    prompt = "You think you know him pretty well, but there's room for improvement!";
  } else if (difficulty === 'easy' && score < 3) {
    prompt = "You're familiar with him, but maybe spend more time together!";
  } else {
    prompt = "Great job! You really know Pyae Sone well!";
  }

  return (
    <div className="result-page">
      <h2>Your Score: {score}/5</h2>
      <p>{prompt}</p>
      <button onClick={onRetry}>Retry Quiz</button> {/* Retry button */}
    </div>
  );
};

export default ResultPage;