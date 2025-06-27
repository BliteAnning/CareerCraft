
import blackid from "../assets/blackid.jpg"
import student1 from "../assets/student1.jpg"
import kids from "../assets/kids.jpg"
import group from "../assets/group.jpg"
import student from "../assets/student.jpg"
import kid from "../assets/kid.jpg"
import { useNavigate } from "react-router"
 


const Landing = ({showDrawer}) => {
    const navigate = useNavigate();

    return (
        <div className={`flex flex-col ${showDrawer ? "transition-all duration-300 md:ml-64" : ""}`}>
        <div className="flex flex-col md:flex-row min-h-screen  bg-black text-white">

            <div className="relative w-full md:w-1/2 h-96 md:h-auto">
                <img
                    src={blackid}
                    alt="Career Image"
                    className="object-cover w-full h-full"
                />
                
            </div>

            {/* Right side - text and buttons */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-10">
                <h1 className="text-4xl md:text-5xl font-bold  mb-6">
                    Unlock the  future you
                </h1>
                <p className="text-gray-300 mb-8">
                    Say hello to CareerCraft, the new career platform to help you Navigate your academic journey.
                </p>
                <div className="flex gap-4">
                    <button className="bg-purple-700 rounded-xl cursor-pointer border-b-blue-50 p-4 hover:bg-white hover:text-purple-700 transition-all duration-500 ease-in-out"
                    onClick={()=>navigate("/questionnaire")}>
                        Start Questionaire Now
                    </button>
                    <button className="text-white px-3 cursor-pointer rounded-xl border-white hover:bg-white hover:text-black transition-all duration-500 ease-in-out"
                    >
                        Learn More About CareerCraft
                    </button>
                </div>
            </div>
            
        </div>
        <div className="flex flex-col items-center mx-4 mt-10 sm:mt-20">
                <div className="items-start text-3xl sm:text-5xl px-4">
                    <h1>Described as <span className="font-extrabold">"Surprisingly Accurate"</span>, We have helped a number of students Navigate through their Career journey with
                    no stress of figuring out where to begin</h1>
                </div>
                <div className="sm:flex px-7 gap-4 mt-20">
                    <div>
                        <h1 className="text-4xl text-gray-600">Accuracy</h1>
                        <p className="mt-5">With the AI powered analysis, you will get to chooose a career which
                            perfectly fits your interest and personality. </p>
                    </div>
                    <div>
                        <h1 className="text-4xl text-gray-600">Resources and Library</h1>
                        <p className="mt-5">Access all books, videos, articles and other resources which
                            will help you learn more about your career. </p>
                    </div>
                    <div>
                        <h1 className="text-4xl text-gray-600">Matches</h1>
                        <p className="mt-5">Find the path that's right for you based on your strength,
                             personality and interest.
                        </p>
                    </div>
                </div>
            </div>

            {/*Section 3*/}
            <div className="flex gap-3 bg-purple-700 flex-col sm:mt-16 sm:flex-row">
                <div className="sm:w-1/2  p-5">
                    <img src={student1} alt="" className="object-cover rounded-xl  w-full h-96" />
                </div>
                <div className="mt-20 text-white ">
                    <h1 className="font-extrabold ">Lost in which career to choose? We can help</h1>
                    <div className="border-2 mt-3.5 p-3 hover:cursor-pointer hover:border-white transition-all ease-in-out duration-500  rounded-xl border-purple-400" onClick={()=>navigate("/questionnaire")}>Start the questionnaire </div>
                    <div className="border-2 mt-3.5 p-3 hover:cursor-pointer hover:border-white transition-all ease-in-out duration-500  rounded-xl border-purple-400" onClick={()=>navigate("/quiz")}>Take a quiz about your career</div>
                    <div className="border-2 mt-3.5 p-3 hover:cursor-pointer hover:border-white transition-all ease-in-out duration-500  rounded-xl border-purple-400" onClick={()=>navigate("/resources")}>Explore Resources in the library</div>
                    <div className="border-2 mt-3.5 p-3 hover:cursor-pointer hover:border-white transition-all ease-in-out duration-500  rounded-xl border-purple-400" onClick={()=>navigate("/resume")}>Get a free resume Assessment</div>
                    
                </div>
            </div>
            {/*Audience section*/}
            <div className="sm:py-16 flex flex-col bg-black px-4">
                <h1 className="font-extrabold text-5xl items-center text-white justify-center flex">Who can Use CareerCraft?</h1>
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 p-10">
                    <div className="sm:flex-row flex flex-col gap-2 border-black rounded-xl shadow-2xl">
                        <img src={kids} alt="student" className="object-cover h-40 w-40 rounded-xl" />
                        <div className="p-4">
                            <h1 className="font-bold text-2xl text-gray-500">Elementary School Students</h1>
                            <p className="mt-2 text-white">Parents can take the test for their kids who are yet to start the elementary school</p>
                        </div>
                    </div>
                    <div className="sm:flex-row flex flex-col gap-2 border-black rounded-xl shadow-2xl">
                        <img src={kid} alt="student" className="object-cover h-40 w-40 rounded-xl" />
                        <div className="p-4">
                            <h1 className="font-bold text-2xl text-gray-500">Middle & High School Students</h1>
                            <p className="mt-2 text-white">Students who are in middle and High school and are stuck which career they should pursue and how to do that,
                                this is your opportunity to find the right fit for yourself.
                            </p>
                        </div>
                    </div>
                    <div className="sm:flex-row flex flex-col gap-2 border-black rounded-xl shadow-2xl">
                        <img src={student} alt="student" className="object-cover h-40 w-40 rounded-xl" />
                        <div className="p-4">
                            <h1 className="font-bold text-2xl text-gray-500">College Graduates</h1>
                            <p className="mt-2 text-white">College Graduates who are still trying to figure out what they want to do even after college?
                                this is the right platform for you to find  that path.
                            </p>
                        </div>
                    </div>
                    <div className="sm:flex-row flex flex-col gap-2 border-purlpe-600 rounded-xl shadow-2xl">
                        <img src={group} alt="student" className="object-cover h-40 w-40 rounded-xl" />
                        <div className="p-4">
                            <h1 className="font-bold text-2xl text-gray-500">Working Professionals</h1>
                            <p className="mt-2 text-white">Not for only students but also for workers who wants to further up their career or take a different
                                path which best suits their personality and interest. </p>
                        </div>
                    </div>
                </div>
            </div>
            {/*motivational section */}
            <div className="flex flex-col sm:flex-row min-h-96 ">
                <div className="flex flex-col bg-purple-400 p-6 gap-3 text-white justify-center items-center text-center w-full sm:w-1/2">
                    <h1 className="text-4xl font-bold">Go ahead and Start navigating your path</h1>
                    <p className="text-2xl font-light">First take the questionnaire to answer few questions about yourself and leave the rest to us.</p>
                    <button className="bg-purple-700 rounded-xl cursor-pointer border-b-blue-50 p-4 hover:bg-white hover:text-purple-700 transition-all duration-500 ease-in-out">
                        Get Started
                    </button>
                </div>
                <div className="flex justify-center items-center w-full sm:w-1/2 text-white p-7 bg-gray-900">
                    <h1 className="text-4xl font-light"> <span className="text-purple-600 text-5xl font-extrabold">"</span> Your Attitude determines your direction. <span className="text-purple-600 text-5xl font-extrabold">"</span> </h1>
                </div>
            </div>
        </div>
    );
}
export default Landing;