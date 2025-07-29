import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router";
const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const userId = localStorage.getItem("userId");
  const careerId = localStorage.getItem("careerId");
  const navigate = useNavigate();
  const [quizId, setQuizId] = useState(() => localStorage.getItem("quizId") || "");

  useEffect(() => {
    const fetchQuiz = async () => {
      
      if (!userId) {
        alert("Log in to access the quiz.");
        return;
      }
      try {
        const res = await axiosInstance.post('/quiz/generatequiz', { userId, careerId });
        if (res.data.success) {
          setQuestions(res.data.quiz.questions);
          setAnswers(Array(res.data.quiz.questions.length).fill(""));
          localStorage.setItem("quizId", res.data.quiz._id);
          setQuizId(res.data.quiz._id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuiz();
  }, []);

  const handleOptionChange = (qIdx, option) => {
    const newAnswers = [...answers];
    newAnswers[qIdx] = option;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submitQuiz = await axiosInstance.post('/quiz/submitquiz', {userId, quizId, answers});
    if (submitQuiz.data.success) {
      alert("Quiz submitted successfully!");
    } else {
      alert("Error submitting quiz.");
    }
    setSubmitted(true);
    
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-white flex flex-col items-center justify-center py-10">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">Career Quiz</h1>
        {careerId? <form onSubmit={handleSubmit}>
          {questions.map((q, idx) => (
            <div key={idx} className="mb-8">
              <div className="text-xl font-semibold text-purple-900 mb-4">{idx + 1}. {q.question}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {q.options.map((option, oIdx) => (
                  <label
                    key={oIdx}
                    className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                      answers[idx] === option
                        ? "border-purple-700 bg-purple-100"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${idx}`}
                      value={option}
                      checked={answers[idx] === option}
                      onChange={() => handleOptionChange(idx, option)}
                      className="mr-3 accent-purple-700"
                      disabled={submitted}
                    />
                    <span className="text-purple-800">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          {!submitted ? (
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-purple-700 text-white font-bold rounded-lg hover:bg-purple-800 transition"
            >
              Submit Answers
            </button>
          ) : (
            <div onClick={()=> navigate("/qresult")} className="text-center cursor-pointer hover:bg-amber-200 text-purple-700 font-semibold text-xl mt-4">
              Click to display results
              {/* Display backend results here */}
            </div>
          )}

        </form> : (
          <div className="text-red-600 text-center">
            Please answer the questionnaire to determine your perfect career fit and get access to your daily quiz
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;