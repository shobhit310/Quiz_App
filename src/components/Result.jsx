function Result({ questions, answers, onRestart }) {
  const score = answers.filter((ans, i) => ans === questions[i].answer).length;

  return (
    <div className="p-6 border rounded-xl shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">
        You scored {score} / {questions.length}
      </h2>
      <ul className="mb-6 space-y-3">
        {questions.map((q, i) => (
          <li key={i} className="p-3 border rounded-lg">
            <p className="font-medium">{q.question}</p>
            <p>
              Your answer:{" "}
              <span
                className={
                  answers[i] === q.answer ? "text-green-600" : "text-red-600"
                }
              >
                {answers[i] || "Not answered"}
              </span>
            </p>
            <p>Correct answer: {q.answer}</p>
          </li>
        ))}
      </ul>
      <button
        onClick={onRestart}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Restart Quiz
      </button>
    </div>
  );
}

export default Result;
