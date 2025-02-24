import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface MCQ {
  question: string;
  options: string[];
  answer: number; // Index of the correct answer
}

const QuizPage: React.FC = () => {
  const { objectName } = useParams<{ objectName: string }>();
  const [questions, setQuestions] = useState<MCQ[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [timer, setTimer] = useState<number>(300); // 5 minutes (300 seconds)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/gemini", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ object: objectName }),
        });

        const data = await response.json();
        setQuestions(data.mcqs);
        setSelectedAnswers(new Array(data.mcqs.length).fill(null));
      } catch (error) {
        console.error("Error fetching quiz:", error);
      } finally {
        setLoading(false);
      }
    };

    if (objectName) fetchQuiz();
  }, [objectName]);

  useEffect(() => {
    if (timer > 0 && score === null) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      handleSubmit();
    }
  }, [timer, score]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleOptionSelect = (questionIndex: number, optionIndex: number) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[questionIndex] = optionIndex;
    setSelectedAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.answer) {
        correctCount++;
      }
    });
    setScore(correctCount);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#1e1e2e] text-white p-6">
      {/* Header Section with Back Button & Timer */}
      <div className="w-full max-w-2xl flex justify-between items-center mb-6">
        <Button
          onClick={() => navigate(-1)}
          className="bg-[#2AF598] text-black px-4 py-2 rounded-full hover:bg-[#009EFD] transition"
        >
          Back
        </Button>
        <div className="text-lg font-semibold bg-[#2f3640] px-4 py-2 rounded-full border border-[#2AF598]">
          ⏳ {formatTime(timer)}
        </div>
      </div>

      {/* Quiz Title */}
      <h1 className="text-3xl font-bold text-[#2AF598] mb-6">Quiz on {objectName}</h1>

      {loading ? (
        <p>Loading questions...</p>
      ) : (
        <div className="w-full max-w-2xl space-y-6">
          {questions.map((q, index) => (
            <div key={index} className="p-4 border border-[#2AF598] rounded-lg bg-[#2f3640] shadow-lg">
              <p className="font-semibold text-lg">{index + 1}. {q.question}</p>
              <ul className="mt-3 space-y-2">
                {q.options.map((option, i) => (
                  <li
                    key={i}
                    className={`p-3 bg-[#1e242d] rounded-lg hover:bg-[#3a3f4b] transition cursor-pointer ${
                      selectedAnswers[index] === i ? 'border-2 border-[#2AF598]' : ''
                    }`}
                    onClick={() => handleOptionSelect(index, i)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Submit Button */}
          {score === null && (
            <Button
              onClick={handleSubmit}
              className="w-full bg-[#2AF598] text-black py-3 rounded-full hover:bg-[#009EFD] transition mt-4"
            >
              Submit
            </Button>
          )}

          {/* Score Display */}
          {score !== null && (
            <div className="p-4 border border-[#2AF598] rounded-lg bg-[#2f3640] mt-4 text-center">
              <h2 className="text-xl font-bold">Your Score: {score} / {questions.length}</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizPage;
