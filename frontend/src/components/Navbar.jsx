import axios from "axios";
import  { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const [isConnected, setIsConnected] = useState(false);
    useEffect(() => {
        localStorage.connected === "true"
            ? setIsConnected(true)
            : setIsConnected(false);
    }, [isConnected, setIsConnected]);

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:3000/api/users/logout", null, {
                withCredentials: true,
            });
            localStorage.connected = false;
            setIsConnected(false);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="navbar bg-black ">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <Link to="/salles" >Salles</Link>
                        </li>
                       { localStorage?.role == "gerant" &&
                        <li>
                            <Link to="/ajouterSalle" >Ajouter une Salle</Link>
                        </li>
}
                       {
                        isConnected || <>
                        <li><Link className="btn bg-white border-0 capitalize" to="/connexion">
                            se Connecter
                        </Link></li>
                        <li> <Link className="btn bg-white border-0 capitalize" to="/s'enregistrer">
                            s'enregistrer
                        </Link></li>
                        </>
                       }
                        
                    </ul>
                </div>
                <Link
                    className="btn btn-ghost normal-case hover:bg-white text-xl text-white  hover:text-white hover:bg-transparent"
                    to="/"
                >
                    SalleEvent
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link to="/salles" className="text-white  hover:text-white hover:bg-transparent">Salles</Link>
                    </li>
                  {
                    localStorage?.role == "gerant" && <li>
                        <Link to="/ajouterSalle" className="text-white hover:text-white hover:bg-transparent">Ajouter une Salle</Link>
                    </li>
                  }
                    
                </ul>
            </div>
            <div className="navbar-end gap-2">
                {isConnected ? (
                    <>
                        <button
                            className="btn capitalize border-0 bg-transparent text-white hovet:text-white hover:bg-transparent"
                            to=""
                            onClick={handleLogout}
                        >
                            Déconnexion
                        </button>
                        <button
                            className="btn capitalize border-0 bg-transparent text-white hovet:text-white hover:bg-transparent"
                            to=""
                            onClick={()=> navigate('/dashboard')}
                        >
                            Dashboard
                        </button>
                    </>
                ) : (
                  
                    <div className="hidden lg:flex gap-2">
                        <Link className="btn capitalize border-0 bg-transparent text-white hovet:text-white hover:bg-transparent" to="/connexion">
                            se Connecter
                        </Link>
                        <Link className="btn capitalize border-0 bg-transparent text-white hovet:text-white hover:bg-transparent" to="/s'enregistrer">
                            s'enregistrer
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
