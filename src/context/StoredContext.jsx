import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../axiosInstance';

const StoredContext = createContext();

export const useStored = () => useContext(StoredContext);

export const StoredProvider = ({ children }) => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(false);
    const [aiResponse, setAiResponse] = useState("");
    const [token, setToken] = useState(() => localStorage.getItem("token") || "");
    const [careerId, setCareerId] = useState(() => localStorage.getItem("careerId") || "")
    const [myCareer, setMyCareer] = useState("")
    const [resources, setResources] = useState([]);
    const [careerDetails, setCareerDetails] = useState("")
    const [resumeRemarks, setResumeRemarks] = useState("");

    // Fetch all questions from backend
    const fetchQuestions = async () => {
        setLoading(true);
        const url = import.meta.env.VITE_API_URL;
        try {
            if (token) {
                const response = await fetch(url + '/api/questionnaire/questions');


                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setQuestions(data.questions);
            }
        } catch (err) {
            console.error('Error fetching questions:', err);
        } finally {
            setLoading(false);
        }
    };


    // Submit answers to backend
    const submitAnswers = async () => {
        const userId = localStorage.getItem("userId");
        try {
            if (token) {
                const res = await axiosInstance.post('/questionnaire/submit-response', {
                    userId,
                    answers
                });

                console.log('Response from server:', res.data);
                setAiResponse(res.data.careerSuggestions);
                setAnswers({}); // Clear answers after submission
                alert("Response submitted successfully");
            }
            else {
                alert("Please login to submit your answers")

                return res.data;
            }

        } catch (err) {
            console.error('Error submitting answers:', err);
            throw err;
        }
    };

    const getSuggestion = async () => {
        const userId = localStorage.getItem("userId");

        try {
            const response = await axiosInstance.get('/questionnaire/career', {
                params: { userId }
            });
            const suggestionObj = response.data.suggestion;
           ;
            if (suggestionObj) {
                setMyCareer(suggestionObj.suggestion);
                setCareerId(suggestionObj._id);
                localStorage.setItem("careerId", suggestionObj._id); // Optional: persist for reloads
            }
            console.log('Suggestion fetched successfully:', suggestionObj.suggestion);
        } catch (error) {
            console.error('Error fetching suggestion:', error);
        }
    }

    const getCareerSummary = async () => {
        const userId = localStorage.getItem("userId");
        setLoading(true)

        try {
            const response = await axiosInstance.post('/roadmap/generate', {
                userId
            });
            console.log('Career summary fetched successfully');
            setCareerDetails(response.data.roadmap);
        } catch (error) {
            console.error('Error fetching career summary:', error);
        } finally {
            setLoading(false);
        }
    }

    const resumeAnalyzer = async (file) => {
        const userId = localStorage.getItem("userId");
        const formData = new FormData();
        formData.append("resume", file);
        formData.append("userId", userId);

        try {
            const response = await axiosInstance.post(
                "/resume/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setResumeRemarks(response.data.remarks);
            return response.data.remarks;
        } catch (error) {
            console.log("Error analyzing resume:", error);
            setResumeRemarks("Failed to analyze resume.");
            throw error;
        }
    };

    const getResources = async () => {
        const userId = localStorage.getItem("userId");

        try {
            const response = await axiosInstance.post('/resources/generate', {
                userId,
                careerId
            }

            );
            setResources(response.data.resource);
            console.log('Resources fetched successfully:',response.data.resource);
        } catch (error) {
            console.error('Error fetching resources:', error);
        }
    }
    return (
        <StoredContext.Provider value={{
            questions,
            answers,
            loading,
            fetchQuestions,
            aiResponse,
            submitAnswers,
            token,
            setCareerId,
            setToken,
            setAnswers,
            myCareer,
            getSuggestion,
            getCareerSummary,
            careerDetails,
            resumeRemarks,
            getResources,
            resources,
            resumeAnalyzer,
            setLoading
        }}>
            {children}
        </StoredContext.Provider>
    );
};