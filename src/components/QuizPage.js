// src/components/QuizPage.js
import React, { useState } from 'react';
import Question from './Question';

const QuizPage = ({ difficulty, questions, onFinish }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  const handleAnswer = (isCorrect, correctAnswerText, userAnswerText) => {
    setUserAnswer(userAnswerText);
    setCorrectAnswer(correctAnswerText);
    setShowResult(true);

    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowResult(false);
      setUserAnswer(null);
      setCorrectAnswer(null);
    } else {
      onFinish(score);
    }
  };

  return (
    <div className="quiz-page">
      <h2 className="quiz-title">Question {currentQuestion + 1}</h2>
      <Question
        question={questions[currentQuestion]}
        onAnswer={handleAnswer}
        showResult={showResult}
        userAnswer={userAnswer}
        correctAnswer={correctAnswer}
      />
      {showResult && (
        <div className="next-button-container">
          <button onClick={handleNextQuestion} className="next-button">
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;