const Footer = () => {
    return ( 
        <footer className="bg-black flex flex-col sm:flex-row sm:justify-between px-20 sm:items-center sm:p-10 text-white">
            <div>
                <h1 className="mb-10 mt-4 sm:mt-1 text-xl font-bold ">FOR INDIVIDUALS</h1>
                <ul>
                    <li className="hover:cursor-pointer hover:text-purple-500 transition-all ease-in-out duration-500">Login</li>
                    <li className="hover:cursor-pointer hover:text-purple-500 transition-all ease-in-out duration-500">Sign Up</li>
                    <li className="hover:cursor-pointer hover:text-purple-500 transition-all ease-in-out duration-500">Start Questionnaire</li>
                    <li className="hover:cursor-pointer hover:text-purple-500 transition-all ease-in-out duration-500">Terms of Service</li>
                </ul>
            </div>
            <div>
                <h1 className="mb-10 mt-4 sm:mt-1 text-xl font-bold ">EXPLORE</h1>
                <ul>
                    <li className="hover:cursor-pointer hover:text-purple-500 transition-all ease-in-out duration-500">Resource Library</li>
                    <li className="hover:cursor-pointer hover:text-purple-500 transition-all ease-in-out duration-500">Resume Analyze</li>
                    <li className="hover:cursor-pointer hover:text-purple-500 transition-all ease-in-out duration-500">Who can take the test</li>
                    <li className="hover:cursor-pointer hover:text-purple-500 transition-all ease-in-out duration-500">Roadmap</li>
                </ul>
            </div>
            <div>
                <h1 className="mb-10 text-xl mt-4 sm:mt-1  font-bold ">@ BLITEQOOD SERVICES 2025</h1>
                <ul>
                    <li className="hover:cursor-pointer hover:text-purple-500 transition-all ease-in-out duration-500">Privacy Policy</li>
                    <li className="hover:cursor-pointer hover:text-purple-500 transition-all ease-in-out duration-500"><a href="mailto:anningbright578@gmail.com">Email us</a></li>
                    <li className="hover:cursor-pointer hover:text-purple-500 transition-all ease-in-out duration-500">About Us</li>
                    <li className="hover:cursor-pointer hover:text-purple-500 transition-all ease-in-out duration-500"><a href="http://" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                </ul>
            </div>
            
        </footer>
     );
}
 
export default Footer;