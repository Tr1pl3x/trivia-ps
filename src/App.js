// src/App.js
import React, { useState } from 'react';
import HomePage from './components/HomePage';
import StartPage from './components/StartPage';
import QuizPage from './components/QuizPage';
import ResultPage from './components/ResultPage';
import { questions } from './questions';
import './styles/App.css';

// Helper function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const App = () => {
  const [showHomePage, setShowHomePage] = useState(true); // Track if home page is shown
  const [difficulty, setDifficulty] = useState(null);
  const [score, setScore] = useState(null);

  const handleStartQuiz = () => {
    setShowHomePage(false); // Hide home page and show difficulty selection
  };

  const handleStart = (difficulty) => {
    setDifficulty(difficulty);
  };

  const handleFinish = (score) => {
    setScore(score);
  };

  // Function to reset the quiz state
  const resetQuiz = () => {
    setShowHomePage(true); // Go back to home page
    setDifficulty(null);
    setScore(null);
  };

  const getQuestions = () => {
    if (!questions) {
      console.error("Questions data is not available.");
      return [];
    }

    let selectedQuestions = [];

    if (difficulty === 'easy') {
      selectedQuestions = [
        ...shuffleArray(questions.easy).slice(0, 3),
        ...shuffleArray(questions.normal).slice(0, 2),
      ];
    } else if (difficulty === 'normal') {
      selectedQuestions = [
        ...shuffleArray(questions.easy).slice(0, 2),
        ...shuffleArray(questions.normal).slice(0, 2),
        ...shuffleArray(questions.hard).slice(0, 1),
      ];
    } else if (difficulty === 'hard') {
      selectedQuestions = [
        ...shuffleArray(questions.normal).slice(0, 2),
        ...shuffleArray(questions.hard).slice(0, 3),
      ];
    }

    selectedQuestions = shuffleArray(selectedQuestions);

    selectedQuestions = selectedQuestions.map((question) => ({
      ...question,
      answers: shuffleArray(question.answers),
    }));

    return selectedQuestions;
  };

  return (
    <div className="App">
      {showHomePage ? (
        <HomePage onStart={handleStartQuiz} /> // Show home page
      ) : (
        <>
          {!difficulty && !score && <StartPage onStart={handleStart} />}
          {difficulty && score === null && (
            <QuizPage
              difficulty={difficulty}
              questions={getQuestions()}
              onFinish={handleFinish}
            />
          )}
          {score !== null && (
            <ResultPage
              score={score}
              difficulty={difficulty}
              onRetry={resetQuiz} // Pass the reset function
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;