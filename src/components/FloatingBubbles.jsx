import React, { useState, useEffect } from 'react';

const FloatingBubbles = () => {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    // Generate initial bubbles (reduced amount so it's not overwhelming, 15 is a good number)
    const initialBubbles = Array.from({ length: 15 }).map((_, i) => createBubble(i));
    setBubbles(initialBubbles);
  }, []);

  const createBubble = (id) => {
    const size = Math.random() * 50 + 20; // Random size between 20px and 70px
    const left = Math.random() * 95 + 2; // Random horizontal start (2% to 97%)
    const duration = Math.random() * 12 + 8; // Float duration 8s to 20s
    const delay = Math.random() * 15; // Random delay so they don't all spawn at once
    
    return {
      id: id !== undefined ? id : Math.random().toString(36).substr(2, 9),
      size,
      left,
      duration,
      delay,
      popped: false
    };
  };

  const handlePop = (id) => {
    // Set bubble as popped to trigger blast animation
    setBubbles(prev => prev.map(b => b.id === id ? { ...b, popped: true } : b));
    
    // Play a subtle pop sound (optional, omitted to be safe/unintrusive)
    
    // Respawn a new bubble in its place after the pop animation finishes
    setTimeout(() => {
      setBubbles(prev => prev.map(b => b.id === id ? createBubble(id) : b));
    }, 300);
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className={`absolute rounded-full pointer-events-auto cursor-pointer hover:brightness-125 transition-all bubble-style ${
            bubble.popped ? 'animate-pop' : 'animate-float'
          }`}
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            top: '100%', // Start exactly at the bottom of the screen
            animationDuration: bubble.popped ? '0.3s' : `${bubble.duration}s`,
            animationDelay: bubble.popped ? '0s' : `${bubble.delay}s`,
            animationFillMode: 'forwards',
          }}
          onClick={() => !bubble.popped && handlePop(bubble.id)}
        />
      ))}
    </div>
  );
};

export default FloatingBubbles;
