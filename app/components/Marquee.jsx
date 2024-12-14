import React from 'react';

export default function Marquee({text, className}) {
  const repeatedText = `${text}  *  `.repeat(50);

  return (
    <div className="overflow-hidden whitespace-nowrap max-w-[1079px] w-full bg-theme-noir h-10 flex items-center rounded-md">
      <h1 className="inline-block animate-marquee text-2xl font-family-serif text-theme-blanc">
        {repeatedText}
      </h1>
    </div>
  );
}
