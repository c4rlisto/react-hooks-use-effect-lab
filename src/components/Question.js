// src/components/Question.jsx
import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeLeft, setTimeLeft] = useState(10); // 10-second timer

  useEffect(() => {
    // Countdown every second
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    // Auto-answer after 10 seconds
    const timeout = setTimeout(() => {
      onAnswered(false); // time ran out, answer is incorrect
    }, 10000);

    // Cleanup timers on unmount
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onAnswered]);

  // Handle user's answer selection
  function handleAnswer(index) {
    const correct = index === question.correctIndex;
    onAnswered(correct);
  }

  return (
    <div>
      <h2>{question.prompt}</h2>
      <p>{timeLeft} seconds remaining</p>
      <div>
        {question.answers.map((answer, index) => (
          <button key={index} onClick={() => handleAnswer(index)}>
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;