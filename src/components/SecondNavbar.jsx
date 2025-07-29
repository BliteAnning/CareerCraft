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
    
    const userId = localStorage.getItem("userId")

    // Drawer content
    const drawer = (
        <div className="w-64 h-full bg-black text-white shadow-lg flex flex-col pt-8 relative">
            {/* Hide button for desktop */}
            <button
                className=" md:block absolute top-4 right-4 text-white z-10"
                onClick={() => setShowDrawer(false)}
                aria-label="Hide menu"
            >
                <Menu/>
            </button>
            <NavItem to="/" onClick={() => setShowDrawer(false)}> <div className="flex gap-5" ><Home/><p>Home</p></div></NavItem>
            <NavItem to="/questionnaire" onClick={() => setShowDrawer(false)} ><div className="flex gap-5" ><FileQuestion/><p>Questionnaire</p></div></NavItem>
            <NavItem to="/quiz" onClick={() => setShowDrawer(false)} ><div className="flex gap-5" ><Book/><p>Career Quiz</p></div></NavItem>
            <NavItem to="/resources" onClick={() => setShowDrawer(false)} ><div className="flex gap-5" ><Database/><p>Resources</p></div></NavItem>
            <NavItem to="/roadmap" onClick={() => setShowDrawer(false)} ><div className="flex gap-5" ><Navigation/><p>Roadmap</p></div></NavItem>
            <NavItem to="/resume" onClick={() => setShowDrawer(false)} ><div className="flex gap-5" ><File/><p>Resume/CV Analyze</p></div></NavItem>
        </div>
    );

    return (
        
           <div className={` fixed top-0 z-40 left-0  `}>
                <div
                    className={` w-64 bg-gray-200 shadow-lg rounded-lg flex flex-col transition-transform duration-500 ${
                        showDrawer ? "translate-x-0" : "-translate-x-full"
                    }`}
                    style={{ width: "16rem"}} // w-64
                >
                    {drawer}
                </div>
                {/* Show button when hidden */}
                {!showDrawer && (
                    <button
                        className=" absolute top-25 left-0 z-50 bg-purple-700 text-white p-2 shadow"
                        onClick={() => userId? setShowDrawer(true): alert("Please sign in to view dashboard")}
                        aria-label="Show menu"
                        style={{ marginLeft: 0 }}
                    >
                    
                        <Menu/>
                    </button>
                )}
            </div>

            
        
    );
};

export default SecondNavbar;