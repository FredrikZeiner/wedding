'use client';

import { useEffect, useState } from 'react';
const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    const weddingDate = new Date('2025-07-26T14:00:00');
    const timer = setInterval(() => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="flex justify-center space-x-8 text-center">
      <div className="animate-fadeIn">
        <div className="text-4xl">{timeLeft.days}</div>
        <div className="text-gray-600 text-sm">Dager</div>
      </div>
      <div className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
        <div className="text-4xl">{timeLeft.hours}</div>
        <div className="text-gray-600 text-sm">Timer</div>
      </div>
      <div className="animate-fadeIn" style={{ animationDelay: '0.4s' }}>
        <div className="text-4xl">{timeLeft.minutes}</div>
        <div className="text-gray-600 text-sm">Minutter</div>
      </div>
      <div className="animate-fadeIn" style={{ animationDelay: '0.6s' }}>
        <div className="text-4xl">{timeLeft.seconds}</div>
        <div className="text-gray-600 text-sm">Sekunder</div>
      </div>
    </div>
  );
};
export default Countdown;
