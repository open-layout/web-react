import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import amethyst3 from '@/assets/amethyst_3.png';
import amethyst5 from '@/assets/amethyst_5.png';

const Amethyst = () => {
    const [amethysts, setAmethysts] = useState([]);
    const [rndAmethysts, setRndAmethysts] = useState([]);

    useEffect(() => {
        const images = [amethyst3, amethyst5];
        const positions = [
            { x: 0, y: 0, rot: 135 },   // Top left corner
            { x: 90, y: 0, rot: -135 },  // Top right corner
            { x: 0, y: 90, rot: 45 },  // Bottom left corner
            { x: 90, y: 90, rot: -45 }  // Bottom right corner
        ];
        const random_factor = 10;

        const randomAmethysts = Array.from({ length: 16 }, (_, index) => {
            const image = images[Math.floor(Math.random() * images.length)];
            const pos = positions[Math.floor(Math.random() * positions.length)];

            const rotation = pos.rot + Math.random() * random_factor;
            const position = { x: pos.x + Math.random() * random_factor, y: pos.y + Math.random() * random_factor };

            return { id: index, image, rotation, position };
        });

        const perfectAmethysts = Array.from({ length: 4 }, (_, index) => {
            const image = images[1];
            const pos = positions[index];

            const rotation = pos.rot;
            const position = { x: pos.x, y: pos.y };

            return { id: index, image, rotation, position };
        });

        setAmethysts(perfectAmethysts);
        setRndAmethysts(randomAmethysts);
    }, []);

    return (
        <div className="absolute inset-0 flex justify-center items-center overflow-hidden">
            {amethysts.map((amethyst) => (
                <motion.div
                    key={amethyst.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        position: 'absolute',
                        top: `${amethyst.position.y}vh`,
                        left: `${amethyst.position.x}vw`,
                        transform: `translate(-50%, -50%)`
                    }}
                    className="top-0 left-0"
                >
                    <img src={amethyst.image} alt={`Amethyst ${amethyst.id}`} className="w-40 h-40 shadow-lg object-cover" style={{ transform: `rotate(${amethyst.rotation}deg)` }} />
                </motion.div>
            ))}

            {rndAmethysts.map((amethyst) => (
                <motion.div
                    key={amethyst.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: amethyst.id * 0.05 }}
                    style={{
                        position: 'absolute',
                        top: `${amethyst.position.y}vh`,
                        left: `${amethyst.position.x}vw`,
                    }}
                    className="top-0 left-0"
                >
                    <img src={amethyst.image} alt={`Amethyst ${amethyst.id}`} className="w-20 h-20 shadow-lg object-cover" style={{ transform: `rotate(${amethyst.rotation}deg)` }} />
                </motion.div>
            ))}
        </div>
    );
};

export default Amethyst;
