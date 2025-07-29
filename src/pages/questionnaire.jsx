import { Button } from "@mui/material";
import kidQuestion from "../assets/kidQuestion.jpg"
import illustration from "../assets/find_your_type.svg"
import illustration1 from "../assets/get_insights.svg"
import {useNavigate} from "react-router"

const Questionnaire = ({showDrawer}) => {
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    return (
        <div className={`min-h-screen ${showDrawer ? "transition-all duration-300 md:ml-64" : ""}`}>
            {/*first section*/}
            <div className="bg-purple-200 flex gap-20 flex-col min-h-96 sm:flex-row m-10 rounded-xl p-6">
                <div className="flex sm:w-1/2 flex-col gap-6">
                    <h1 className="text-3xl font-extrabold ">Welcome to <span className="text-green-500">Career Questionnaire
                        Discover the career </span> that truly fits your interest and personality </h1>
                    <p className="text-xl font-light"> Please answer the following questions to help us understand your career goals.</p>

                    <Button
                        variant="contained"
                        sx={{
                            
                            backgroundColor: 'purple',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'white',
                                color: 'purple',
                                border: '2px solid #8e24aa', // violet purple
                            },
                        }}
                        onClick={()=> userId? navigate('/questions'): alert("Please sign up to access the questionnaire")}>
                        Start Questionnaire
                    </Button>

                </div>
                <div className="sm:w-1/2">
                    <img src={kidQuestion} alt="img" className="object-cover h-96 w-80" />
                </div>
            </div>
            {/*second section*/}
            <div className="my-20 flex flex-col sm:flex-row gap-7 justify-between items-center px-10">
                <div className="text-center flex flex-col justify-center items-center">
                    <img src={illustration} alt="img" />
                    <p className="font-bold">Find out your career within minutes</p>
                    <p className="font-light">Our AI model offers an in-depth personalized insights and also strategize your path for you making it 
                        easy for you to focus on your career goals effectively </p>
                </div>
                <div className="text-center flex flex-col justify-center items-center">
                    <img src={illustration1} alt="img" />
                    <p className="font-bold">Discover the smooth transition to your career</p>
                    <p className="font-light">Participants who have used to this platform during the testing phase have discovered infomation and resources
                        they never knew existed. Our platform provides every possible resource that will guide you in this journey
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Questionnaire;