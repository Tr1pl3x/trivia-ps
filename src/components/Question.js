// src/components/Question.js
import React from 'react';

const Question = ({ question, onAnswer, showResult, userAnswer, correctAnswer }) => {
  const handleClick = (answer) => {
    if (!showResult) {
      onAnswer(answer.isCorrect, question.answers.find(a => a.isCorrect).text, answer.text);
    }
  };

  return (
    <div className="question">
      <h3>{question.text}</h3>
      {question.answers.map((answer, index) => (
        <button
          key={index}
          onClick={() => handleClick(answer)}
          disabled={showResult} // Disable buttons after answering
          className={`answer-button ${
            showResult && userAnswer === answer.text
              ? answer.isCorrect
                ? 'correct'
                : 'incorrect'
              : ''
          }`}
        >
          {answer.text}
          {showResult && userAnswer === answer.text && !answer.isCorrect && (
            <span className="icon">❌</span> // Show cross for incorrect answer
          )}
          {showResult && userAnswer === answer.text && answer.isCorrect && (
            <span className="icon">✔</span> // Show tick for correct answer
          )}
        </button>
      ))}
    </div>
  );
};

export default Question;