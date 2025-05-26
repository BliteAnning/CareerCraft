import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    LinearProgress,
    Typography,
    TextField,
    Paper,
    RadioGroup,
    FormControlLabel,
    Radio,
    Checkbox,
    FormGroup,
} from '@mui/material';
import { useNavigate } from 'react-router';
import {useStored} from '../context/StoredContext';
import axios from 'axios';

const QuestionnaireStepper = ({ onSubmit }) => {
    const [step, setStep] = useState(0);
    const [completed, setCompleted] = useState(false);
    const navigate = useNavigate();
    const {
        questions,
        answers,
        loading,
        submitAnswers,
        fetchQuestions,
        setAnswers,
    } = useStored();

    useEffect(() => {
        fetchQuestions();
    }, []);

    const handleChange = (e) => {
        if (!questions[step]) return;
        setAnswers({ ...answers, [questions[step].key]: e.target.value });
        console.log(answers);
    };

    const handleRadioChange = (e) => {
        setAnswers({ ...answers, [questions[step].key]: e.target.value });
        console.log(answers);
    };

    const handleCheckboxChange = (option) => (e) => {
        const current = answers[questions[step].key] || [];
        if (e.target.checked) {
            setAnswers({
                ...answers,
                [questions[step].key]: [...current, option],
            });
            console.log(answers);
        } else {
            setAnswers({
                ...answers,
                [questions[step].key]: current.filter((item) => item !== option),
            });
            console.log(answers);
        }
    };

    const handleNext = () => {
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            // onSubmit(answers); // Remove this
            setCompleted(true); // Show completion step
        }
    };

    const handleBack = () => {
        if (step > 0) setStep(step - 1);
    };

    const handleGenerate = async () => {
        await submitAnswers();
        navigate('/generate'); // or your actual response page route
};

    const progress = questions.length > 0 ? ((step + 1) / questions.length) * 100 : 0;

    const renderInput = () => {
        const question = questions[step];
        const value = answers[question.key] || (question.type === 'checkbox' ? [] : '');

        if (question.type === 'radio' && question.options) {
            return (
                <RadioGroup
                    value={value}
                    onChange={handleRadioChange}
                >
                    {question.options.map((opt) => (
                        <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                    ))}
                </RadioGroup>
            );
        }

        if (question.type === 'checkbox' && question.options) {
            return (
                <FormGroup>
                    {question.options.map((opt) => (
                        <FormControlLabel
                            key={opt}
                            control={
                                <Checkbox
                                    checked={value.includes(opt)}
                                    onChange={handleCheckboxChange(opt)}
                                />
                            }
                            label={opt}
                        />
                    ))}
                </FormGroup>
            );
        }

        // Default to text field
        return (
            <TextField
                multiline
                fullWidth
                rows={4}
                variant="outlined"
                placeholder="Type your answer here..."
                value={value}
                onChange={handleChange}
            />
        );
    };

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto', mt: 9, minHeight: 500 }}>
            {loading || questions.length === 0 ? (
                <Typography>Loading questions...</Typography>
            ) : completed ? (
                <Box sx={{ textAlign: 'center', mt: 8 }}>
                    <Typography variant="h4" gutterBottom>
                        Congratulations!
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 4 }}>
                        You have completed the questionnaire.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleGenerate}
                    >
                        Generate
                    </Button>
                </Box>
            ) : (
                <>
                    <Typography variant="h6" gutterBottom>
                        Question {step + 1} of {questions.length}
                    </Typography>

                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                            mb: 2,
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: '#e0e0e0',
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: 'purple',
                            },
                        }}
                    />

                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        {questions[step].text}
                    </Typography>

                    {renderInput()}

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                        <Button
                            variant="contained"
                            onClick={handleBack}
                            disabled={step === 0}
                        >
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                        >
                            {step === questions.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </>
            )}
        </Paper>
    );
};

export default QuestionnaireStepper;