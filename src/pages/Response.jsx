import axiosInstance from "../axiosInstance";
import { useStored } from "../context/StoredContext";
import { useNavigate } from "react-router";



const Response = () => {
    const { aiResponse, setCareerId } = useStored();
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const handleAccepted = async () => {
        try{
            const response = await axiosInstance.post('/questionnaire/career', {
                userId: localStorage.getItem("userId"),
                suggestion: aiResponse.suggestion,
        });
        if (response.data.success) {
            localStorage.setItem("careerId", response.data._id)
            console.log("Career path accepted:", response.data);
            
            alert("Career path accepted successfully!");
            navigate("/roadmap");

        } else {
            alert("Failed to accept career path.");
        }
    } catch (error) {
        console.error("Error accepting career path:", error);
    }
}

   

    return (
        <div className="min-h-screen p-10 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-green-500 mb-4">YOUR PERFECT CAREER FIT IS READY</h1>
            <p className="font-bold mb-8 text-center">
                Based on your answers, we recommend this career path:
            </p>
            <div className="mt-10 px-4 max-w-2xl w-full">
                {userId ? (
                    <>
                        <div className="text-3xl font-extrabold tracking-widest text-purple-500 text-center mb-8">
                            {aiResponse.suggestion}
                        </div>
                        <p className="text-lg font-light text-gray-700 mb-4">
                             Reasons why this career path is a great fit for you:
                        </p>
                        <div className="bg-gray-100 p-4 rounded-xl">{aiResponse.description}</div>
                        <div className="mt-8 flex gap-3 items-center">
                            <p>Do you accept this career path?</p>
                            <button className="bg-purple-600 text-white p-4 rounded-md" onClick={handleAccepted}>Yes</button>
                            <button className="bg-gray-300 text-gray-700 p-4 rounded-md">No</button>
                        </div>
                    </>
                ) : (
                    <div>No suggestion yet.</div>
                )}
            </div>
        </div>
    );
};

export default Response;