import React from 'react';

export default function Marquee({text, className}) {
  const repeatedText = `${text}  *  `.repeat(10);

  return (
    <div className="overflow-hidden relative max-w-[1079px] w-full bg-theme-noir h-[162px] flex items-center rounded-full my-12">
      <div className="absolute whitespace-nowrap flex animate-marquee">
        <h1 className="inline-block text-6xl font-family-serif text-theme-gris">
          {repeatedText}
        </h1>
        <h1 className="inline-block text-6xl font-family-serif text-theme-gris">
          {repeatedText}
        </h1>
      </div>
    </div>
  );
}
