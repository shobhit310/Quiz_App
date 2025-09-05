import { useState, useEffect } from "react";
import Question from "./components/Question";
import Result from "./components/Result";
import Progress from "./components/Progress";
import questionsData from "./data/questions.json";

function App() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [highScore, setHighScore] = useState(
    Number(localStorage.getItem("highScore")) || 0
  );

  useEffect(() => {
    if (difficulty) {
      const filtered = questionsData.filter(
        (q) => q.difficulty === difficulty
      );
      setQuestions(filtered);
    }
  }, [difficulty]);

  const handleAnswer = (option) => {
    const updated = [...answers];
    updated[current] = option;
    setAnswers(updated);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);

      const score = updated.filter(
        (ans, i) => ans === questions[i].answer
      ).length;

      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("highScore", score);
      }
    }
  };

  const handleTimeout = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrent(0);
    setAnswers([]);
    setFinished(false);
    setStarted(false);
    setDifficulty(null);
  };

  return (
    <div
      className="max-w-2xl mx-auto p-8"
      role="main"
      aria-label="Quiz Application"
    >
      <h1 className="text-3xl font-extrabold mb-3 text-center">
        🎯 Quiz Challenge
      </h1>
      <p className="text-gray-700 mb-8 text-center">
        High Score:{" "}
        <span className="font-semibold text-blue-600">{highScore}</span>
      </p>

      {!started ? (
        <div className="space-y-6 text-center">
          <p className="text-gray-800 font-medium">
            Select your difficulty to begin:
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                setDifficulty("easy");
                setStarted(true);
              }}
              className="px-5 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
              aria-label="Start quiz with easy difficulty"
            >
              Easy
            </button>
            <button
              onClick={() => {
                setDifficulty("medium");
                setStarted(true);
              }}
              className="px-5 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
              aria-label="Start quiz with medium difficulty"
            >
              Medium
            </button>
            <button
              onClick={() => {
                setDifficulty("hard");
                setStarted(true);
              }}
              className="px-5 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
              aria-label="Start quiz with hard difficulty"
            >
              Hard
            </button>
          </div>
        </div>
      ) : !finished ? (
        <>
          <Progress current={current + 1} total={questions.length} />
          {questions.length > 0 && (
            <Question
              data={questions[current]}
              onAnswer={handleAnswer}
              selected={answers[current]}
              onTimeout={handleTimeout}
            />
          )}
        </>
      ) : (
        <Result
          questions={questions}
          answers={answers}
          onRestart={restartQuiz}
        />
      )}
    </div>
  );
}

export default App;
