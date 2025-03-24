// src/components/NameInputPage.js
import React, { useState } from 'react';

const NameInputPage = ({ onNameSubmit }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the name
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }

    if (name.length > 20) {
      setError('Name must be less than 20 characters.');
      return;
    }

    // If valid, submit the name
    setError('');
    onNameSubmit(name);
  };

  return (
    <div className="name-input-page">
      <h1>Welcome to the Pyae Sone Trivia Quiz!</h1>
      <p>Please enter your name to continue:</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="name-input"
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">
          Continue
        </button>
      </form>
    </div>
  );
};

export default NameInputPage;