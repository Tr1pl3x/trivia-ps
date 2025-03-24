// src/App.js
import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import NameInputPage from './components/NameInputPage';
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
  const [showHomePage, setShowHomePage] = useState(true);
  const [showNameInputPage, setShowNameInputPage] = useState(false);
  const [userName, setUserName] = useState('');
  const [difficulty, setDifficulty] = useState(null);
  const [score, setScore] = useState(null);

  // Set the app title
  useEffect(() => {
    document.title = 'Pyae Sone Trivia Quiz';
  }, []);

  const handleStartQuiz = () => {
    setShowHomePage(false);
    setShowNameInputPage(true); // Show the name input page
  };

  const handleNameSubmit = (name) => {
    setUserName(name); // Save the user's name
    setShowNameInputPage(false); // Hide the name input page
  };

  const handleStart = (difficulty) => {
    setDifficulty(difficulty);
  };

  const handleFinish = (score) => {
    setScore(score);

    // Log user details when the quiz is finished
    logUserDetails(score);
  };

  const resetQuiz = () => {
    setShowHomePage(true);
    setShowNameInputPage(false); // Reset to the home page
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

  // Function to log user details
  const logUserDetails = (score) => {
    const timestamp = new Date().toLocaleString(); // Get current timestamp
    console.log('User Details:');
    console.log('Name:', userName);
    console.log('Score:', score);
    console.log('Difficulty:', difficulty);
    console.log('Timestamp:', timestamp);
  };

  return (
    <div className="App">
      {showHomePage ? (
        <HomePage onStart={handleStartQuiz} />
      ) : (
        <>
          {showNameInputPage ? (
            <NameInputPage onNameSubmit={handleNameSubmit} />
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
                  onRetry={resetQuiz}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default App;