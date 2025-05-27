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
                    <div key={currentPhase} className="mt-6 mb-2 font-bold text-lg text-purple-200">{currentPhase}</div>
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
    const { getSuggestion, myCareer, getCareerSummary, careerDetails } = useStored();

    useEffect(() => {
        getSuggestion();
        getCareerSummary();
    }, []);

    return (
        <div className="min-h-screen bg-emerald-950">
            <div>
                <h1 className="text-3xl font-extrabold text-white text-center">Explore your Roadmap</h1>
                <p className="text-lg font-light text-white text-center mb-10">
                    Discover the steps to achieve your career goals with our personalized roadmap.
                </p>
                <h1 className="text-2xl font-bold text-white text-center">{myCareer}</h1>
                <div className="bg-emerald-900 rounded-xl p-6 mt-6 max-w-2xl mx-auto shadow-lg">
                    {careerDetails
                        ? formatRoadmap(careerDetails)
                        : <div className="text-white text-center">No roadmap generated yet.</div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Roadmap;