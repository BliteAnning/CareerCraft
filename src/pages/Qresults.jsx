import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";


const Qresults = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const userId = localStorage.getItem("userId");
  const quizId = localStorage.getItem("quizId");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axiosInstance.post("/quiz/results", { userId, quizId });
        if (res.data.success) {
          setResult(res.data);
        }
      } catch (error) {
        setResult({ error: "Failed to fetch results." });
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [userId, quizId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-white flex flex-col items-center justify-center py-10">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">Quiz Results</h1>
        {loading ? (
          <div className="text-purple-700 text-center">Loading...</div>
        ) : result && result.success ? (
          <>
            <div className="text-xl text-purple-900 font-semibold mb-4 text-center">
              Score: <span className="text-purple-700">{result.score} / {result.total}</span>
            </div>
            <div className="mb-6 text-purple-800 text-center">{result.feedback}</div>
           <div className="text-lg font-semibold text-purple-900 mb-2 text-center">Correct Answers:</div>
        <div className="space-y-2">
          {result.correctAnswers && result.correctAnswers.map((answer, idx) => (
            <div key={idx} className="text-purple-800 text-center">
              {idx + 1}. {answer}
            </div>
          ))}
         </div>
        </>
        ) : (
          <div className="text-red-600 text-center">{result?.error || "No results found."}</div>
        )}
      </div>
    </div>
  );
};

export default Qresults;