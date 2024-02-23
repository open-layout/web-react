import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import favicon from '@/assets/favicon.svg';
import faviconyellow from '@/assets/faviconyellow.svg';
import faviconblue from '@/assets/faviconblue.svg';
import favicongreen from '@/assets/favicongreen.svg';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';



const LoginButton = () => {
    const [darkMode] = useState(true); // Modo oscuro activado por defecto
    const [randomIndex, setRandomIndex] = useState(0);
    const [, setIsHovering] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const isAuthenticated = useIsAuthenticated();

    const handleMouseEnter = () => {
        setIsHovering(true);
        setTimeout(() => {
            setShowDropdown(true);
        }, 415); // Delay de 300 milisegundos
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        setShowDropdown(false);
    };

    const images = [favicon, faviconyellow, faviconblue, favicongreen];

    useEffect(() => {
        getRandomIndex();
    });

    // Función para generar un índice aleatorio y actualizar el estado
    const getRandomIndex = () => {
        const newIndex = Math.floor(Math.random() * images.length);
        setRandomIndex(newIndex);
    };
 
    return (
        <div>
            {isAuthenticated() ? (
                <div>
                    <div
                        className="border-2 backdrop-blur-md border-gray-700/50 rounded-xl absolute top-0 right-10 mt-8 p-2 w-16 h-16 flex flex-col items-center group hover:w-40 hover:h-48 duration-500 ease-in-out"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}>
                        <Link to="/auth" className="rounded-full cursor-pointer block ">
                            <img src={images[randomIndex]} alt="" className="w-10 mb-3" />
                        </Link>
                        {showDropdown && (
                            <div className="flex flex-col opacity-100  transition-opacity w-40 h-48 items-center justify-center text-xl rounded-xl">
                                <hr className="border-t border-gray-700/50 w-32 " />
                                <Link
                                    to="/dashboard"
                                    className={`hover:text-gray-300 mt-3 ${darkMode ? ' text-white' : ' text-black'
                                        }`}>
                                    Dashboard
                                </Link>
                                    <hr className="border-t border-gray-700/50 w-32 mt-3" />
                                    <Link
                                        to="/"
                                        className="text-red-500 font-bold hover:text-red-700 mt-3">
                                        Log Out
                                    </Link>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div>
                    <div className="border-2 backdrop-blur-md border-gray-700/50 rounded-xl absolute top-0 right-10 mt-8 p-2 w-16 h-16 flex flex-col justify-center items-center ">
                        <Link to="/auth" className="rounded-full cursor-pointer block ">
                            <img
                                src={images[randomIndex]}
                                alt=""
                                className="w-10 grayscale"
                            />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )

}

export default LoginButton;