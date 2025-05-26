import { NavLink } from "react-router";

const SecondNavbar = () => {

    const NavItem = ({ to, children }) => (
        <NavLink
            to={to}
            className={({ isActive }) =>
                isActive ? "text-purple-500 font-extrabold" : "text-white font-bold"
            }
        >
            {children}
        </NavLink>
    );
    return (
        <nav className="flex justify-between items-center p-4 bg-gray-300">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/questionnaire">Questionnaire</NavItem>
            <NavItem to="/about">Career Quiz</NavItem>
            <NavItem to="/projects">Resources</NavItem>
            <NavItem to="/contact">Career Summary</NavItem>
            <NavItem to="/roadmap">Roadmap</NavItem>
            <NavItem to="/resume">Resume/CV Analyze</NavItem>

        </nav>
    );
}

export default SecondNavbar;