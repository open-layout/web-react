import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import amethyst3 from '@/assets/amethyst_3.png';
import amethyst5 from '@/assets/amethyst_5.png';

const Amethyst = () => {
    const [amethysts, setAmethysts] = useState([]);

    const randomAmethyst = () => ({
        id: (Math.random() + 1).toString(36).substring(24),
        x: Math.random() * window.innerWidth,
        y: -120,
        rotate: Math.random() * 360,
        scale: Math.random() * 0.5 * 0.5,
        velocity: Math.random() * 5 + 2
    });

    const addAmethyst = () => {
        setAmethysts(prevAmethysts => [...prevAmethysts, randomAmethyst()]);
    };

    useEffect(() => {
        const intervalId = setInterval(addAmethyst, 500);
        return () => clearInterval(intervalId); 
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden">
            <AnimatePresence>
                {amethysts.map((amethyst, index) => (
                    <motion.img
                        src={index % 2 === 0 ? amethyst3 : amethyst5} 
                        alt="Amethyst"
                        style={{
                            zIndex: -1,
                            position: 'absolute',
                            left: amethyst.x,
                            top: amethyst.y,
                            rotate: amethyst.rotate,
                            scale: amethyst.scale
                        }}
                        animate={{ y: window.innerHeight + 100 }}
                        transition={{ duration: amethyst.velocity, ease: 'easeInOut' }}
                        onAnimationComplete={() => {
                            if (amethysts.length > 100)
                                setAmethysts(prevAmethysts => prevAmethysts.filter((a, i) => a.y > 100));
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default Amethyst;
