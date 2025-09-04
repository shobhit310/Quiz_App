import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Question({ data, onAnswer, selected, onTimeout }) {
  const [timeLeft, setTimeLeft] = useState(30);

  // Reset timer when new question loads
  useEffect(() => {
    setTimeLeft(30);
  }, [data]);

  // Countdown logic
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeout();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, onTimeout]);

  return (
    <motion.div
      key={data.question}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="p-6 border rounded-xl shadow-sm bg-white"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{data.question}</h2>
        <span className="text-sm font-medium text-gray-600">
          ⏳ {timeLeft}s
        </span>
      </div>
      <div className="grid gap-3">
        {data.options.map((option, idx) => (
          <motion.button
            key={idx}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAnswer(option)}
            className={`px-4 py-2 rounded-lg border transition 
              ${
                selected === option
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white hover:bg-gray-100"
              }`}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

export default Question;
