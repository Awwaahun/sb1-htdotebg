import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function Countdown() {
  const weddingDate = new Date('2025-06-14T14:00:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  return (
    <div className="py-16 bg-gradient-to-r from-rose-500 to-orange-500">
      <div className="container mx-auto px-4 text-center text-white">
        <Clock size={48} className="mx-auto mb-4" />
        <h2 className="text-3xl font-serif mb-8">Counting Down to Forever</h2>

        <div className="grid grid-cols-4 gap-4 max-w-3xl mx-auto">
          {Object.entries(timeLeft).map(([unit, value], index) => (
            <div
              key={unit}
              className="bg-white/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white/30 transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-5xl font-bold mb-2 transition-transform duration-300">{value}</div>
              <div className="text-sm uppercase tracking-wider">{unit}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
