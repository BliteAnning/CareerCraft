import axiosInstance from "../axiosInstance";
import { useStored } from "../context/StoredContext";

function parseAiResponse(aiResponse) {
    if (!aiResponse) return null;

    // Extract the main career path (first sentence before "Here's why" or similar)
    const match = aiResponse.match(/a suitable career path (would be|is) \*\*(.+?)\*\*/i);
    const mainCareer = match ? match[2].toUpperCase() : "CAREER PATH";

    // Extract reasons (lines after "Here's why" or after the colon)
    const reasonsSection = aiResponse.split("Here's why")[1] || "";
    // Split by asterisk bullet points
    const reasons = reasonsSection
        .split('*')
        .map(r => r.trim())
        .filter(r => r);

    // For each reason, bold the topic (before the colon)
    const formattedReasons = reasons.map((reason, idx) => {
        const [topic, ...rest] = reason.split(':');
        return (
            <div key={idx} className="mb-3">
                <span className="font-bold block">{topic.trim()}:</span>
                <span className="block ml-2">{rest.join(':').trim()}</span>
            </div>
        );
    });

    return { mainCareer, formattedReasons };
}

const Response = () => {
    const { aiResponse } = useStored();

    const handleAccepted = async () => {
        try{
            const response = await axiosInstance.post('/questionnaire/career', {
                userId: localStorage.getItem("userId"),
                suggestion: parseAiResponse(aiResponse).mainCareer
        });
        if (response.data.success) {
            console.log("Career path accepted:", response.data);
            alert("Career path accepted successfully!");
        } else {
            alert("Failed to accept career path.");
        }
    } catch (error) {
        console.error("Error accepting career path:", error);
    }
}

    const parsed = parseAiResponse(aiResponse);

    return (
        <div className="min-h-screen p-10 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-green-500 mb-4">YOUR PERFECT CAREER FIT IS READY</h1>
            <p className="font-bold mb-8 text-center">
                Based on your answers, we recommend this career path:
            </p>
            <div className="mt-10 px-4 max-w-2xl w-full">
                {parsed ? (
                    <>
                        <div className="text-3xl font-extrabold tracking-widest text-purple-500 text-center mb-8">
                            {parsed.mainCareer}
                        </div>
                        <p className="text-lg font-light text-gray-700 mb-4">
                             Reasons why this career path is a great fit for you:
                        </p>
                        <div className="bg-gray-100 p-4 rounded-xl">{parsed.formattedReasons}</div>
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