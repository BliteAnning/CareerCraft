import { useEffect, useState } from "react";
import { useStored } from "../context/StoredContext";

// Improved parser for AI-generated resource text
function parseLinksText(linksText) {
    const lines = linksText.split('\n').map(l => l.trim()).filter(Boolean);

    // Find where the first section or link starts
    let introEndIdx = lines.findIndex(line => line.startsWith("**") || /\[https?:\/\/.+\]/.test(line) || /^https?:\/\//.test(line));
    if (introEndIdx === -1) introEndIdx = lines.length;

    // Introductory statement
    const intro = lines.slice(0, introEndIdx).join(' ');

    // Parse resource cards
    const cards = [];
    let section = "";
    let descLines = [];
    for (let i = introEndIdx; i < lines.length; i++) {
        const line = lines[i];

        // Section header
        if (line.startsWith("**") && line.endsWith("**")) {
            section = line.replace(/\*/g, '').replace(/:$/, '');
            continue;
        }

        // Try to extract Markdown-style [link](url)
        const mdLinkMatch = line.match(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/);
        if (mdLinkMatch) {
            let title = section || "Resource";
            let desc = descLines.join(' ').replace(/^\*+\s*/, '').replace(/\*+$/, '').replace(/\s+/g, ' ').trim();
            cards.push({
                title,
                desc: desc ? desc : mdLinkMatch[1],
                link: mdLinkMatch[2]
            });
            descLines = [];
            continue;
        }

        // Try to extract [url] style
        const bracketLinkMatch = line.match(/\[(https?:\/\/[^\]]+)\]/);
        if (bracketLinkMatch) {
            let title = section || "Resource";
            let desc = descLines.join(' ').replace(/^\*+\s*/, '').replace(/\*+$/, '').replace(/\s+/g, ' ').trim();
            cards.push({
                title,
                desc,
                link: bracketLinkMatch[1]
            });
            descLines = [];
            continue;
        }

        // Try to extract raw URL
        const urlMatch = line.match(/(https?:\/\/[^\s]+)/);
        if (urlMatch && line.length === urlMatch[1].length) {
            let title = section || "Resource";
            let desc = descLines.join(' ').replace(/^\*+\s*/, '').replace(/\*+$/, '').replace(/\s+/g, ' ').trim();
            cards.push({
                title,
                desc,
                link: urlMatch[1]
            });
            descLines = [];
            continue;
        }

        // Description line (remove asterisk)
        if (line.startsWith("*")) {
            descLines.push(line.replace(/^\*\s*/, ''));
        } else if (line) {
            // Additional description or note
            descLines.push(line);
        }
    }

    return { intro, cards };
}

const Resource = () => {
    const { getResources, resources } = useStored();
    const [showVideos, setShowVideos] = useState(false);

    useEffect(() => {
        getResources();
        // eslint-disable-next-line
    }, []);

    if (!resources) {
        return <div>Loading resources...</div>;
    }

    const { links = [], videos = [], files = [] } = resources;

    // If links is a single AI-generated string, parse it
    const linksText = Array.isArray(links) ? links.join('\n') : links;
    const { intro, cards } = parseLinksText(linksText);

    return (
        <div className="p-8 min-h-96">
            <div className="flex justify-between  items-center mb-6">
                <h2 className="text-2xl font-bold">Career Resources</h2>
                <button
                    className="px-4 py-2 bg-white rounded-lg font-semibold shadow hover:bg-gray-600 transition"
                    onClick={() => setShowVideos((prev) => !prev)}
                >
                    {showVideos ? "Show Articles & PDFs" : "Show Videos"}
                </button>
            </div>

            {!showVideos ? (
                <div>
                    {/* Introductory statement */}
                    {intro && (
                        <div className="mb-6 text-gray-700 text-lg">Explore Resources related to your chosen career. Get access to all Articles, pdf textbooks and Videos related to your Career. 
                        Your Career journey STARTS NOW</div>
                    )}
                    {/* Resource cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cards.length === 0 && (
                            <div className="col-span-full text-gray-500">No articles or PDFs found.</div>
                        )}
                        {cards.map((card, i) => (
                            <div key={i} className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center">
                                <img
                                    src={`https://www.google.com/s2/favicons?domain=${encodeURIComponent(card.link)}`}
                                    alt="Preview"
                                    className="w-10 h-10 mb-3 rounded"
                                />
                                <div className="font-bold mb-2 text-center">{card.title}</div>
                                <div className="mb-2 text-center text-gray-700">{card.desc}</div>
                                {card.link && (
                                    <a
                                        href={card.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-800 transition"
                                    >
                                        Visit Resource
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.length === 0 && (
                        <div className="col-span-full text-gray-500">No videos found.</div>
                    )}
                    {videos.map((video, i) => (
                        <div key={i} className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center">
                            <img
                                src={`https://img.youtube.com/vi/${(video.match(/v=([^&]+)/) || [])[1] || ""}/hqdefault.jpg`}
                                alt="Video Thumbnail"
                                className="w-full h-40 object-cover rounded mb-3"
                            />
                            <a
                                href={video}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-blue-700 hover:underline text-center break-all mb-2"
                            >
                                {video}
                            </a>
                            <a
                                href={video}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800 transition"
                            >
                                Watch Video
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Resource;