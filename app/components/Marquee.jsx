import React from 'react';

export default function Marquee({text, className}) {
  const repeatedText = `${text}  *  `.repeat(80);

  return (
    <div className="overflow-hidden whitespace-nowrap max-w-[1079px] w-full bg-theme-noir h-[162px] flex items-center rounded-full">
      <h1 className="inline-block animate-marquee text-6xl font-family-serif text-theme-gris">
        {repeatedText}
      </h1>
    </div>
  );
}
