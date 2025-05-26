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
    const [myCareer, setMyCareer] = useState("")

    // Fetch all questions from backend
    const fetchQuestions = async () => {
        setLoading(true);
        try {
            if(token){
                const response = await fetch('http://localhost:4000/api/questionnaire/questions');
            

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
            if(token){
            const res = await axiosInstance.post('/questionnaire/submit-response', {
                userId,
                answers
            });
            
            console.log('Response from server:', res.data);
            setAiResponse(res.data.careerSuggestions);
            setAnswers({}); // Clear answers after submission
            alert("Response submitted successfully");
            }
            else{
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
            console.log('Suggestion fetched successfully:', response.data.suggestion.suggestion);
            setMyCareer(response.data.suggestion.suggestion)
        } catch (error) {
            console.error('Error fetching suggestion:', error);
        }
    }

    return (
        <StoredContext.Provider value={{
            questions,
            answers,
            loading,
            fetchQuestions,
            aiResponse,
            setLoading,
            submitAnswers,
            token,
            setToken,
            setAnswers,
            myCareer,
            getSuggestion
        }}>
            {children}
        </StoredContext.Provider>
    );
};