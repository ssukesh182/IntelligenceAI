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
    <div className="max-w-2xl mx-auto p-6 space-y-6 text-white">
      <Button onClick={() => navigate(-1)} className="bg-[#2AF598] text-black">⬅ Back</Button>
      <h1 className="text-2xl font-bold">Quiz on {objectName}</h1>

      {loading ? (
        <p>Loading questions...</p>
      ) : (
        <div className="space-y-4">
          {questions.map((q, index) => (
            <div key={index} className="p-4 border border-[#2AF598] rounded-lg bg-[#2f3640]">
              <p className="font-semibold">{index + 1}. {q.question}</p>
              <ul className="mt-2 space-y-2">
                {q.options.map((option, i) => (
                  <li
                    key={i}
                    className={`p-2 bg-[#1e242d] rounded-lg hover:bg-[#3a3f4b] transition cursor-pointer ${selectedAnswers[index] === i ? 'border-2 border-[#2AF598]' : ''}`}
                    onClick={() => handleOptionSelect(index, i)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {!loading && score === null && (
        <Button onClick={handleSubmit} className="w-full bg-[#2AF598] text-black mt-4">Submit</Button>
      )}

      {score !== null && (
        <div className="p-4 border border-[#2AF598] rounded-lg bg-[#2f3640] mt-4">
          <h2 className="text-xl font-bold">Your Score: {score} / {questions.length}</h2>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
