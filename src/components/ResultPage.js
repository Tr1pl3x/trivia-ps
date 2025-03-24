// src/components/ResultPage.js
import React from 'react';

const ResultPage = ({ score, difficulty, onRetry }) => {
  let prompt;
  let buttonText = "Retry Quiz";
  const shareText = "You should screenshot this result and share this with Pyae Sone tho.";

  // Determine which GIF to display
  let gifSrc = '';
  if (difficulty === 'hard' && score === 5) {
    gifSrc = '/1.gif'; // Hard difficulty, perfect score
  } else if (score >= 3) {
    gifSrc = '/2.gif'; // Any difficulty, score >= 3
  } else if (difficulty === 'hard' && score < 3) {
    gifSrc = '/3.gif'; // Hard difficulty, score < 3
  } else if (difficulty === 'normal' && score < 3) {
    gifSrc = '/4.gif'; // Normal difficulty, score < 3
  } else if (difficulty === 'easy' && score < 3) {
    gifSrc = '/5.gif'; // Easy difficulty, score < 3
  }

  if (difficulty === 'hard') {
    if (score === 5) {
      prompt = "Hot damn! 🔥 You really are an expert on him!";
      buttonText = "Return Home";
    } else if (score >= 3) {
      prompt = "You said you are an expert and actually not bad. Room for improvement tho 😏";
    } else {
      prompt = "You call yourself an expert? how disappointing 😔";
    }
  } else if (difficulty === 'normal') {
    if (score === 5) {
      prompt = "I am impressed! 😲";
      buttonText = "Return Home";
    } else if (score >= 3) {
      prompt = "Not bad, try harder next time tho :)";
    } else {
      prompt = "Nah I knew you were lying, how disappointing 😔";
    }
  } else if (difficulty === 'easy') {
    if (score === 5) {
      prompt = "Whoaa, I didn't know you were this observant 😳";
      buttonText = "Return Home";
    } else if (score >= 3) {
      prompt = "Hmm, not bad, better luck next time tho :)";
    } else {
      prompt = "It's fine. I am happy you don't know me at all 🙂";
    }
  }

  return (
    <div className="result-page">
      <h2>Your Score: {score}/5</h2>

      {/* Display the GIF */}
      {gifSrc && (
        <div className="gif-container">
          <img src={gifSrc} alt="Result GIF" className="result-gif" />
        </div>
      )}

      <p>{prompt}</p>
      <p className="share-text">{shareText}</p>
      <button onClick={onRetry} className="retry-button">
        {buttonText}
      </button>
    </div>
  );
};

export default ResultPage;