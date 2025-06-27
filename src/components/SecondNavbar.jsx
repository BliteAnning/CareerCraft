import { useState } from "react";
import { NavLink } from "react-router";
import {Menu, FileQuestion, Home, Book, File, Navigation, Database} from 'lucide-react';

const NavItem = ({ to, children, onClick }) => (
    
    <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
            isActive
                ? "text-purple-500 shadow-2xl font-extrabold block py-2 px-4"
                : "text-white font-bold block py-2 px-4"
        }
    >
        {children}
    </NavLink>
);

const SecondNavbar = ({showDrawer, setShowDrawer}) => {
    const [drawerOpen, setDrawerOpen] = useState(false); // mobile
    

    // Drawer content
    const drawer = (
        <div className="w-64 h-full bg-black text-white shadow-lg rounded-lg flex flex-col pt-8 relative">
            {/* Hide button for desktop */}
            <button
                className="hidden md:block absolute top-4 right-4 text-white z-10"
                onClick={() => setShowDrawer(false)}
                aria-label="Hide menu"
            >
                <Menu/>
            </button>
            <NavItem to="/" onClick={() => setShowDrawer(false)}> <div className="flex gap-5" ><Home/><p>Home</p></div></NavItem>
            <NavItem to="/questionnaire" onClick={() => setShowDrawer(false)} ><div className="flex gap-5" ><FileQuestion/><p>Questionnaire</p></div></NavItem>
            <NavItem to="/about" onClick={() => setShowDrawer(false)} ><div className="flex gap-5" ><Book/><p>Career Quiz</p></div></NavItem>
            <NavItem to="/resources" onClick={() => setShowDrawer(false)} ><div className="flex gap-5" ><Database/><p>Resources</p></div></NavItem>
            <NavItem to="/roadmap" onClick={() => setShowDrawer(false)} ><div className="flex gap-5" ><Navigation/><p>Roadmap</p></div></NavItem>
            <NavItem to="/resume" onClick={() => setShowDrawer(false)} ><div className="flex gap-5" ><File/><p>Resume/CV Analyze</p></div></NavItem>
        </div>
    );

    return (
        <>
            {/* Hamburger menu for mobile */}
           

            {/* Desktop drawer (slide in/out) */}
            <div className="fixed left-0 h-full z-40">
                <div
                    className={`h-full w-64 bg-gray-200 shadow-lg rounded-lg flex flex-col transition-transform duration-500 ${
                        showDrawer ? "translate-x-0" : "-translate-x-full"
                    }`}
                    style={{ width: "16rem"}} // w-64
                >
                    {drawer}
                </div>
                {/* Show button when hidden */}
                {!showDrawer && (
                    <button
                        className="absolute top-20 left-0 z-50 bg-purple-700 text-white p-2 rounded-r shadow"
                        onClick={() => setShowDrawer(true)}
                        aria-label="Show menu"
                        style={{ marginLeft: 0 }}
                    >
                        {/* Right arrow icon */}
                        <Menu/>
                    </button>
                )}
            </div>

            {/* Mobile drawer (slide in/out) 
            <div>
                <div
                    className={`fixed top-0 left-0 h-full z-50 bg-black text-white bg-opacity-40 transition-opacity duration-300 ${
                        showDrawer ? "block" : "hidden"
                    }`}
                    onClick={() => setShowDrawer(false)}
                >
                    <div
                        className={`bg-black text-white w-64 h-full shadow-lg transform transition-transform duration-500 ${
                            showDrawer ? "translate-x-0" : "-translate-x-full"
                        }`}
                        onClick={e => e.stopPropagation()}
                    >
                        
                        <button
                            className="absolute top-4 right-4 text-gray-700"
                            onClick={() => setShowDrawer(false)}
                            aria-label="Close menu"
                        >
                            ✕
                        </button>
                        {drawer}
                    </div>
                </div>
            </div>*/}
        </>
    );
};

export default SecondNavbar;