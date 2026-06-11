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

  const handleFinish = async (score) => {
    setScore(score);

    // Log user details when the quiz is finished
    const timestamp = new Date().toLocaleString(); // Get current timestamp
    const userDetails = {
      name: userName,
      score: score,
      difficulty: difficulty,
      timestamp: timestamp,
    };

    console.log('User Details:', userDetails);

    // Send data to Google Sheets
    await sendDataToGoogleSheets(userDetails);
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

// Append a failed/unsent result to localStorage so it's never lost.
const queueResultLocally = (data) => {
  if (!window.localStorage) return;
  try {
    const saved = JSON.parse(localStorage.getItem('triviaPSResults') || '[]');
    saved.push(data);
    localStorage.setItem('triviaPSResults', JSON.stringify(saved));
    console.log('Saved result to localStorage as fallback');
  } catch (e) {
    console.error('Error saving to localStorage:', e);
  }
};

// Function to send data to Google Sheets.
// Never throws — returns { success } and falls back to localStorage on failure.
const sendDataToGoogleSheets = async (data) => {
  // Use the URL from your deployment
  const webAppUrl = 'https://script.google.com/macros/s/AKfycbytfh6JZFtSU6vdaQQY8thzxWlZKWZ4jMeOKBbsvYkAtKBFWO8duHsnn_k5DBQtqfMG2g/exec';

  try {
    // Send as text/plain so the browser treats this as a "simple" CORS request: no
    // preflight, and Apps Script returns the response with the CORS header we can read.
    // (application/json would trigger a preflight OPTIONS that Apps Script can't answer.)
    // Unlike the old no-cors mode, this lets us actually see whether the write succeeded.
    const response = await fetch(webAppUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(data),
      redirect: 'follow',
    });

    // e.g. HTTP 403 when the deployment's access is restricted, or 5xx from the script.
    if (!response.ok) {
      throw new Error(`Google Sheets responded with HTTP ${response.status}`);
    }

    // Apps Script returns JSON like { result: "success", data: "..." }.
    // A non-JSON body still counts as delivered, since the HTTP status was OK.
    let body = null;
    try {
      body = await response.json();
    } catch (e) {
      // ignore — treat as success based on HTTP status
    }

    if (body && body.result && body.result !== 'success') {
      throw new Error(`Google Sheets reported: ${JSON.stringify(body)}`);
    }

    console.log('Result successfully recorded to Google Sheets');
    return { success: true };
  } catch (error) {
    console.error('Failed to send data to Google Sheets:', error);
    queueResultLocally(data);
    return { success: false, error: String(error) };
  }
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