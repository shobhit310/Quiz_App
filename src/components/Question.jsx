function Question({ data, onAnswer, selected }) {
  return (
    <div className="p-6 border rounded-xl shadow-sm bg-white">
      <h2 className="text-lg font-semibold mb-4">{data.question}</h2>
      <div className="grid gap-3">
        {data.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(option)}
            className={`px-4 py-2 rounded-lg border transition 
              ${selected === option 
                ? "bg-blue-600 text-white border-blue-600" 
                : "bg-white hover:bg-gray-100"}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
