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

  useEffect(() => {
    setQuestions(questionsData);
  }, []);

  const handleAnswer = (option) => {
    const updated = [...answers];
    updated[current] = option;
    setAnswers(updated);

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
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Quiz App</h1>
      {!finished ? (
        <>
          <Progress current={current + 1} total={questions.length} />
          {questions.length > 0 && (
            <Question
              data={questions[current]}
              onAnswer={handleAnswer}
              selected={answers[current]}
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
