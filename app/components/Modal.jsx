import {RiCloseLargeLine} from '@remixicon/react';
import React from 'react';

export default function Modal({title, message, onClose}) {
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className="fixed inset-0 bg-theme-noir bg-overlay flex items-center justify-center z-50"
      onClick={handleBackgroundClick}
    >
      <div className="bg-theme-gris border-2 border-black rounded-lg p-6 w-[90%] max-w-md relative text-center">
        {/* Bouton de fermeture */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer transform transition-transform hover:scale-110"
        >
          <RiCloseLargeLine size={24} />
        </button>

        {/* Contenu du modal */}
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="mt-2 text-sm">{message}</p>
      </div>
    </div>
  );
}