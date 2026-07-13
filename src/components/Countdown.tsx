"use client";

import React, { useState, useEffect } from 'react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2026-10-30T09:00:00+05:30').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section className="bg-ieee-blue py-10 border-y border-ieee-blue shadow-inner relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-x divide-ieee-cyan/20">
          {timeBlocks.map((block) => (
            <div key={block.label} className="flex flex-col items-center justify-center">
              <span className="text-4xl md:text-5xl font-heading font-bold text-ieee-white tracking-tighter tabular-nums">
                {String(block.value).padStart(2, '0')}
              </span>
              <span className="text-xs md:text-sm font-semibold text-ieee-cyan uppercase tracking-widest mt-1">
                {block.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
