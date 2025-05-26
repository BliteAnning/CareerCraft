import { useStored } from "../context/StoredContext";
import { useEffect } from "react";

const Roadmap = () => {
    const {getSuggestion, myCareer} = useStored()

    useEffect(() => {
            getSuggestion();
    }, []);


    return ( 
        <div className="min-h-screen bg-emerald-950">
            <div>
                <h1 className="text-3xl font-extrabold text-white text-center ">Explore your Roadmap</h1>
                <p className="text-lg font-light text-white text-center mb-10">Discover the steps to achieve your career goals with our personalized roadmap.</p>
                <h1 className="text-2xl font-bold text-white text-center">{myCareer}</h1>
            </div>

        </div>
     );
}
 
export default Roadmap;