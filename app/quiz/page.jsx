"use client";
import React, { useState } from "react";
import { quiz } from "../data.js";

function Page() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswer: 0,
    wrongAnswer: 0,
  });

  const { questions } = quiz;
  const { answers, correctAnswer } = questions[activeQuestion];

  const onAnswerSelected = (answer, index) => {
    setChecked(true);
    setSelectedAnswerIndex(index);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };

  const nextQuestion = () => {
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 1,
            correctAnswer: prev.correctAnswer + 1,
          }
        : {
            ...prev,
            wrongAnswer: prev.wrongAnswer + 1,
          }
    );

    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
    setChecked(false);
    setSelectedAnswerIndex(null);
    setSelectedAnswer(null);
  };

  return (
    <div className="container">
      <h1>Quiz Page</h1>
      <div>
        <h2>
          Question: {activeQuestion + 1}
          <span>/{questions.length}</span>
        </h2>
      </div>
      <div>
        {!showResult ? (
          <div className="quiz-container">
            <h3>{questions[activeQuestion].question}</h3>
            <ul>
              {answers.map((answer, index) => (
                <li
                  key={index}
                  onClick={() => onAnswerSelected(answer, index)}
                  className={
                    selectedAnswerIndex === index ? "li-selected" : "li-hover"
                  }
                >
                  <span>{answer}</span>
                </li>
              ))}
            </ul>
            {checked ? (
              <button onClick={nextQuestion} className="btn">
                {activeQuestion === questions.length - 1 ? "Finish" : "Next"}
              </button>
            ) : (
              <button onClick={nextQuestion} disabled className="btn-disable">
                {activeQuestion === questions.length - 1 ? "Finish" : "Next"}
              </button>
            )}
          </div>
        ) : (
          <div className="quiz-container">
            <h3>Results</h3>
            <h3>Overall: {(result.correctAnswer / questions.length) * 100}%</h3>
            <p>
              Total Questions: <span>{questions.length}</span>
            </p>
            <p>
              Total Score: <span>{result.score}</span>
            </p>
            <p>
              Correct Answer: <span>{result.correctAnswer}</span>
            </p>
            <p>
              Wrong Answer: <span>{result.wrongAnswer}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
