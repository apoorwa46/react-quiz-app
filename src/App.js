import React, { useState } from 'react';
import quizData from './quizData';
import './App.css';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [quizCompleted, setQuizCompleted] = useState(false);
  const currentQuestionData = quizData[currentQuestionIndex];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowFeedback(false);
  };

  const handleNextQuestion = () => {
    if (!selectedOption) {
      alert('Please select an answer.');
      return;
    }

    const isCorrect = selectedOption === currentQuestionData.correctAnswer;

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
      setFeedbackMessage('Correct!');
    } else {
      setFeedbackMessage(`Incorrect. The correct answer was: ${currentQuestionData.correctAnswer}`);
    }

    setShowFeedback(true);
    setSelectedOption(null);

    if (currentQuestionIndex < quizData.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setShowFeedback(false);
      }, 1500);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowFeedback(false);
    setFeedbackMessage('');
    setQuizCompleted(false);
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Interactive Quiz</h1>
      <div className="progress-tracker">
        Question {currentQuestionIndex + 1} / {quizData.length}
      </div>
      {currentQuestionData && !quizCompleted && (
        <div className="question-card">
          <h2 className="question-text">{currentQuestionData.question}</h2>
          <div className="options-container">
            {currentQuestionData.options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${selectedOption === option ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {showFeedback && <p className={`feedback ${feedbackMessage.startsWith('Correct') ? 'correct' : 'incorrect'}`}>{feedbackMessage}</p>}

      {!quizCompleted && selectedOption && (
        <button className="next-button" onClick={handleNextQuestion}>
          {currentQuestionIndex === quizData.length - 1 ? 'Finish' : 'Next'}
        </button>
      )}

      {quizCompleted && (
        <div className="results-card">
          <h2>Quiz Completed!</h2>
          <p>Your final score is: {score} out of {quizData.length}</p>
          <button className="restart-button" onClick={handleRestartQuiz}>
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default App;