import {RiArrowDownSLine} from '@remixicon/react';

export default function Accordion({
  title,
  content,
  isOpen = false,
  onClick = () => {},
}) {
  return (
    <div className="w-full border-b border-black pb-3 font-sans">
      <button
        className="w-full flex items-center justify-between text-left py-4 text-lg font-medium cursor-pointer hover:text-blue-600"
        onClick={onClick}
      >
        <h3>{title}</h3>
        <RiArrowDownSLine
          className={`transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>
      <p
        className={`text-gray-600 mt-2 transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        {content}
      </p>
    </div>
  );
}
