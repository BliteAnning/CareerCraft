import visionboard from "../assets/visionboard.jpg";
import { MdCloudUpload } from 'react-icons/md'; // Material Design
import { useStored } from '../context/StoredContext'
import { useState } from 'react'


// Helper to format AI remarks into cards
const formatRemarks = (remarks) => {
    if (!remarks) return null;

    // Split into main sections by "**1.", "**2.", "**3." or similar
    const sectionRegex = /\*\*\d+\.\s*(.+?)\*\*/g;
    let match, lastIndex = 0, sections = [];

    // Find all main sections
    while ((match = sectionRegex.exec(remarks)) !== null) {
        if (sections.length > 0) {
            // Previous section's content is between lastIndex and match.index
            sections[sections.length - 1].content = remarks.slice(lastIndex, match.index).trim();
        }
        sections.push({ title: match[1].trim(), content: "" });
        lastIndex = sectionRegex.lastIndex;
    }
    // Add the last section's content
    if (sections.length > 0) {
        sections[sections.length - 1].content = remarks.slice(lastIndex).trim();
    } else {
        // fallback: no sections found, just show all
        return (
            <div className="bg-white rounded-xl shadow p-6 text-black">
                {remarks}
            </div>
        );
    }

    // Helper to render subpoints as bullets
    const renderBullets = (text) => {
        // Split by lines starting with "*"
        const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
        const bullets = [];
        let currentBullet = null;
        lines.forEach(line => {
            if (line.startsWith('*')) {
                if (currentBullet) bullets.push(currentBullet);
                currentBullet = line.replace(/^\*\s*/, '');
            } else if (currentBullet) {
                currentBullet += ' ' + line;
            }
        });
        if (currentBullet) bullets.push(currentBullet);
        return (
            <ul className="list-disc ml-6 mt-2">
                {bullets.map((b, i) => <li key={i} className="mb-1">{b}</li>)}
            </ul>
        );
    };

    return (
        <div className="flex flex-col gap-8">
            {sections.map((sec, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-lg p-6 text-black">
                    <div className="font-bold text-xl text-purple-700 mb-2">{sec.title}</div>
                    {/* Try to split subheadings and bullets */}
                    {sec.content.split(/(\*\*.+?\*\*)/g).map((part, i) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                            // Subheading
                            return <div key={i} className="font-semibold mt-4 mb-1 text-purple-600">{part.replace(/\*/g, '')}</div>;
                        } else if (part.trim().startsWith('*')) {
                            // Bullets
                            return <div key={i}>{renderBullets(part)}</div>;
                        } else if (part.trim()) {
                            // Paragraph
                            return <div key={i} className="mb-2">{part.trim()}</div>;
                        }
                        return null;
                    })}
                </div>
            ))}
        </div>
    );
};

// ...inside your Resume component's return, replace the remarks display with:


const Resume = () => {
    const { resumeAnalyzer, resumeRemarks } = useStored();
    const [selectedFile, setSelectedFile] = useState(null);
    const [generating, setGenerating] = useState(false)
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setGenerating(true);
        if (selectedFile) {
            await resumeAnalyzer(selectedFile);
        }
        setGenerating(false)
    };

    return (
        <div className='min-h-screen '>
            <div className="p-10 flex bg-purple-700 gap-20 ">
                <div className="w-1/2 justify-center items-center text-white">
                    <h1 className="font-extrabold text-2xl">GET YOUR RESUME ANALYZED AND ASSESSED NOW BY OUR POWERED AI ASSISTANCE</h1>
                    <p className="mt-7 text-xl font-light ">Get your resume reviewed by powerful AI assistance and suggest possible areas for improvement to suit your Job requirements.</p>
                    <form
                        className="mt-10 flex flex-col items-center border rounded-xl py-4 gap-4"
                        onSubmit={handleSubmit}
                    >
                        <p className="text-lg font-semibold">Upload your resume in PDF format:</p>
                        <label className="cursor-pointer flex-col items-center justify-center gap-5" htmlFor="">
                            <MdCloudUpload style={{ marginRight: 8, alignItems: 'center' }} size={40} />
                            <input type="file" name="resume" accept=".pdf" onChange={handleFileChange} className="border rounded-xl cursor-pointer p-3" required />
                        </label>

                        <button type="submit"
                            className="border bg-white text-xl text-black font-extralight rounded-xl p-4"
                            disabled={!selectedFile}
                        >
                            {generating ? "Analyzing resume..." : "Analyze Resume"}
                        </button>
                    </form>
                </div>

                <div className="w-1/2">
                    <img src={visionboard} alt="visionboard" className="object-cover h-96 w-96" />
                </div>
            </div>

            {resumeRemarks &&
                <div className='p-10'>
                    {formatRemarks(resumeRemarks)}
                </div>
            }


        </div>
    );
}

export default Resume;