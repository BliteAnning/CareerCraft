import { Button, IconButton, Avatar } from "@mui/material";
import logo from '../assets/CcLogo.png'
import { useStored } from "../context/StoredContext";


const Navbar = ({ setShowLogin, showLogin }) => {
    const { token, setToken } = useStored();
    const logout = ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setToken("");
        window.location.reload();
    }

    return (
        <nav className="p-4 flex bg-[#000000] justify-between items-center">
            <img src={logo} alt="img" className="object-cover h-20 w-28"/>
            <div>
                {token ? (
                    <IconButton onClick={logout}>
                        <Avatar sx={{ bgcolor: 'purple' }} />
                    </IconButton>
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