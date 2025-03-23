// src/components/QuizPage.js
import React, { useState } from 'react';
import Question from './Question';

const QuizPage = ({ difficulty, questions, onFinish }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null); // Track the user's answer
  const [correctAnswer, setCorrectAnswer] = useState(null); // Track the correct answer

  const handleAnswer = (isCorrect, correctAnswerText, userAnswerText) => {
    setUserAnswer(userAnswerText); // Store the user's answer
    setCorrectAnswer(correctAnswerText); // Store the correct answer
    setShowResult(true); // Show the result

    if (isCorrect) {
      setScore(score + 1); // Update the score if the answer is correct
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1); // Move to the next question
      setShowResult(false); // Reset for the next question
      setUserAnswer(null); // Reset user's answer
      setCorrectAnswer(null); // Reset correct answer
    } else {
      onFinish(score); // Finish the quiz if it's the last question
    }
  };

  return (
    <div className="quiz-page">
      <h2>Question {currentQuestion + 1}</h2>
      <Question
        question={questions[currentQuestion]}
        onAnswer={handleAnswer}
        showResult={showResult}
        userAnswer={userAnswer}
        correctAnswer={correctAnswer}
      />
      {showResult && (
        <button onClick={handleNextQuestion} className="next-button">
          Next
        </button>
      )}
    </div>
  );
};

export default QuizPage;