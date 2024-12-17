import {RiArrowLeftBoxFill, RiArrowRightBoxFill} from '@remixicon/react';
import {useState} from 'react';

export default function DinamicSection({sections}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = sections.map((section) => ({
    id: section.id,
    titre: section.Titre?.value || 'Titre indisponible',
    description: section.Description?.value || '',
    image: section.Image?.value || '',
    labelUrl: section.Label_url?.value || 'En savoir plus',
    url: section.Url?.value || '#',
  }));

  const currentItem = items[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <div className="relative w-full bg-gray-100 text-gray-800 py-6">
      <div className="flex flex-row items-center justify-between w-full px-36">
        <div className="flex-1 ">
          <h2 className="text-lg font-bold mb-2">{currentItem.titre}</h2>
          <p className="text-sm mb-4 w-52">{currentItem.description}</p>
          <a
            href={currentItem.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {currentItem.labelUrl}
          </a>
        </div>
        {currentItem.image && (
          <img
            src={currentItem.image}
            alt={currentItem.titre}
            className="w-96 h-auto object-cover rounded-lg ml-6"
          />
        )}
      </div>
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
        <button onClick={handlePrev}>
          <RiArrowLeftBoxFill className="w-8 h-8 text-gray-600 hover:text-gray-800 cursor-pointer" />
        </button>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
        <button onClick={handleNext}>
          <RiArrowRightBoxFill className="w-8 h-8 text-gray-600 hover:text-gray-800 cursor-pointer" />
        </button>
      </div>
    </div>
  );
}
