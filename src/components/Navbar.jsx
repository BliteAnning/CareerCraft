import { Button, IconButton, Avatar, Tooltip } from "@mui/material";
import logo from '../assets/CcLogo.png'
import { useStored } from "../context/StoredContext";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";


const Navbar = ({ setShowLogin, showLogin, setShowDrawer, showDrawer }) => {
    const { token, setToken } = useStored();
    const userId = localStorage.getItem("userId")
    const logout = ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("careerId");
        localStorage.removeItem("quizId");
        setToken("");
        window.location.reload();
    }
    const navigate = useNavigate()

    return (
        <nav className="p-4 flex bg-[#000000] justify-between items-center">
            <img src={logo} alt="img" className="object-cover h-20 w-28"/>
            <div>
                <ul className=" hidden sm:list-none sm:gap-8 text-white sm:flex cursor-pointer">
                    <li onClick={() => navigate("/")}>Home</li>
                    <li><a href="/contact">Contact</a></li>
                    <li onClick={()=> userId ? setShowDrawer(!showDrawer): toast.error('Log in or Sign up to access dashboard') }>Dashboard</li>
                </ul>
            </div>
            <div>
                {token ? (
                    <Tooltip title="click to logout" arrow>
                    <IconButton onClick={logout}>
                        <Avatar sx={{ bgcolor: 'purple' }} />
                    </IconButton>
                    </Tooltip>
                ) : (
                    <Button
                        variant="contained"
                        sx={{
                            ml: 2,
                            backgroundColor: 'purple',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'white',
                                color: 'purple',
                                border: '2px solid #8e24aa',
                            },
                        }}
                        onClick={() => setShowLogin(!showLogin)}
                    >
                        Login / Signup
                    </Button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;