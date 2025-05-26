import React from 'react';
import QuestionnaireStepper from '../components/stepper';
import axios from 'axios';

const Questions = () => {
  const handleSubmit = async (answers) => {
    try {
      const userId = 'replace_with_user_id';
      const response = await axios.post('/api/questionnaire/submit-response', {
        userId,
        answers,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Submission failed', error);
    }
  };

  return <QuestionnaireStepper onSubmit={handleSubmit} />;
};

export default Questions;
