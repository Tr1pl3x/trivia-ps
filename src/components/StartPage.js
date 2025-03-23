import React from 'react';

const StartPage = ({ onStart }) => {
  return (
    <div className="start-page">
      <h1>How well do you know Pyae Sone?</h1>
      <p>Choose your difficulty:</p>
      <button onClick={() => onStart('easy')}>I'm familiar with him (Easy)</button>
      <button onClick={() => onStart('normal')}>I think I know him pretty well (Normal)</button>
      <button onClick={() => onStart('hard')}>I am an expert on him, I know him from head to toe! (Hard)</button>
    </div>
  );
};

export default StartPage;