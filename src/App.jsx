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
    <div className="max-w-xl mx-auto p-6" role="main" aria-label="Quiz Application">
      <h1 className="text-2xl font-bold mb-2">Quiz App</h1>
      <p className="text-gray-600 mb-6">
        High Score: <span className="font-semibold">{highScore}</span>
      </p>

      {!started ? (
        <div className="space-y-4">
          <p className="text-gray-700 font-medium">Choose Difficulty:</p>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setDifficulty("easy");
                setStarted(true);
              }}
              className="px-4 py-2 bg-green-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
              aria-label="Start quiz with easy difficulty"
            >
              Easy
            </button>
            <button
              onClick={() => {
                setDifficulty("medium");
                setStarted(true);
              }}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
              aria-label="Start quiz with medium difficulty"
            >
              Medium
            </button>
            <button
              onClick={() => {
                setDifficulty("hard");
                setStarted(true);
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
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
