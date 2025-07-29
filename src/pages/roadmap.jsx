import { useStored } from "../context/StoredContext";
import { useEffect } from "react";

// Helper to format the roadmap string into styled steps
const formatRoadmap = (roadmap) => {
    if (!roadmap) return null;

    // Split into lines and clean up
    const lines = roadmap.split('\n').map(line => line.trim()).filter(Boolean);

    const elements = [];
    let currentPhase = null;
    let currentBullets = [];

    lines.forEach((line, idx) => {
        // Detect phase/title (e.g., **Phase 1: ...** or **Goal:**)
        const phaseMatch = line.match(/^\*\*(.+?)\*\*$/);
        const goalMatch = line.match(/^\*\*Goal:\*\*\s*(.+)$/i);

        if (phaseMatch) {
            // Push previous phase and its bullets
            if (currentPhase) {
                elements.push(
                    <div key={currentPhase} className="mt-6 mb-2 font-bold text-lg text-purple-600">{currentPhase}</div>
                );
                if (currentBullets.length > 0) {
                    elements.push(
                        <ul key={currentPhase + "-ul"} className="list-disc ml-8 text-white">
                            {currentBullets.map((b, i) => <li key={i} className="mb-1">{b}</li>)}
                        </ul>
                    );
                }
                currentBullets = [];
            }
            currentPhase = phaseMatch[1];
        } else if (goalMatch) {
            // Special styling for Goal
            elements.push(
                <div key={"goal-" + idx} className="mb-4 text-emerald-300 font-semibold text-base">
                    🎯 <span className="font-bold">Goal:</span> {goalMatch[1]}
                </div>
            );
        } else if (line.startsWith('*')) {
            // Bullet point, remove asterisk and bold if needed
            let bullet = line.replace(/^\*\s*/, '');
            // Bold sub-headings in bullets (e.g., **Focus:**)
            bullet = bullet.replace(/\*\*(.+?)\*\*/g, '<span class="font-bold">$1</span>');
            currentBullets.push(<span dangerouslySetInnerHTML={{ __html: bullet }} />);
        } else if (line) {
            // Regular text, push as a paragraph
            elements.push(
                <div key={"p-" + idx} className="mb-2 text-white text-base">{line}</div>
            );
        }
    });

    // Push the last phase and its bullets
    if (currentPhase) {
        elements.push(
            <div key={currentPhase} className="mt-6 mb-2 font-bold text-lg text-purple-200">{currentPhase}</div>
        );
        if (currentBullets.length > 0) {
            elements.push(
                <ul key={currentPhase + "-ul"} className="list-disc ml-8 text-white">
                    {currentBullets.map((b, i) => <li key={i} className="mb-1">{b}</li>)}
                </ul>
            );
        }
    }

    return <div>{elements}</div>;
};

const Roadmap = () => {
    const { getSuggestion, myCareer, token, loading, getCareerSummary, careerDetails } = useStored();
    const careerId = localStorage.getItem("careerId");

    useEffect(() => {
        getSuggestion();
        getCareerSummary();
    }, []);

    return (
        <div className="min-h-screen bg-black">
            <div>
                <h1 className="text-3xl font-extrabold text-purple-700 text-center">Explore your Roadmap</h1>
                <p className="text-lg font-light text-white text-center mb-10">
                    Discover the steps to achieve your career goals with our personalized roadmap.
                </p>
                {careerId ? (
                    <>
                        <h1 className="text-3xl font-bold text-white text-center">{myCareer}</h1>
                        {token ? (
                            <div className="bg-black rounded-xl p-6 mt-6 max-w-2xl mx-auto shadow-lg">
                                {loading ? (
                                    <div className="animate-spin rounded-full items-center justify-center h-12 w-12 border-t-7 border-purple-600 border-solid"></div>
                                ) : (
                                    formatRoadmap(careerDetails)
                                )}
                            </div>
                        ) : (
                            <div className="text-center text-white items-center justify-center font-light text-3xl">
                                Please Login or register to view your career summary and Roadmap. <br />
                                If you are a new user, register and take your questionnaire to view your roadmap.
                            </div>
                        )}
                    </>
                ) : (
                    <div>
                        <h1 className="text-3xl font-bold text-white text-center">
                            Please answer the questionnaire to determine your perfect career fit
                        </h1>
                        <p className="text-lg font-light text-white text-center mb-10">
                            Once you complete the questionnaire, you will receive a personalized roadmap tailored to your career aspirations.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Roadmap;