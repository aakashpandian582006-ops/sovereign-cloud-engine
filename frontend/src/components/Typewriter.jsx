import React, { useState, useEffect } from 'react';

const Typewriter = ({ text, speed = 15 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    setDisplayedText('');
    
    // Using a timeout loop instead of setInterval for more natural typing speed variation
    let timeoutId;
    
    const typeWriter = () => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
        // Add slight randomness to typing speed to make it look like a real AI processing
        const randomSpeed = speed + (Math.random() * 10 - 5);
        timeoutId = setTimeout(typeWriter, randomSpeed);
      }
    };
    
    typeWriter();

    return () => clearTimeout(timeoutId);
  }, [text, speed]);

  return <>{displayedText}</>;
};

export default Typewriter;
