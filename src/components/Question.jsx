import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Question({ data, onAnswer, selected, onTimeout }) {
  const [countdown, setCountdown] = useState(30);

  // Reset countdown whenever a new question appears
  useEffect(() => {
    setCountdown(30);
  }, [data]);

  // Timer logic
  useEffect(() => {
    if (countdown <= 0) {
      onTimeout();
      return;
    }
    const interval = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(interval);
  }, [countdown, onTimeout]);

  return (
    <motion.div
      key={data.question}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="p-6 rounded-xl border shadow bg-gray-50"
    >
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">{data.question}</h2>
        <span className="text-sm text-gray-500">⏱ {countdown}s</span>
      </div>

      <div className="flex flex-col gap-3">
        {data.options.map((option, index) => (
          <motion.button
            key={index}
            whileTap={{ scale: 0.97 }}
            onClick={() => onAnswer(option)}
            className={`px-4 py-2 rounded-md border text-left transition-colors
              ${
                selected === option
                  ? "bg-blue-500 text-white border-blue-500"
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
