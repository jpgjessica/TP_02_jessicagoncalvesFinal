import {RiArrowLeftLine, RiArrowRightLine} from '@remixicon/react';
import {useState} from 'react';
import Button from './Button';

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
    <div className="relative bg-theme-noir text-theme-white py-8">
      <div className="grid grid-col-1 md:grid-cols-2 gap-12 items-center justify-between w-full px-16 md:px-36 md:mx-16">
        <div className="flex-1 ">
          <h2 className="text-lg font-bold mb-2">{currentItem.titre}</h2>
          <p className="text-sm mb-4">{currentItem.description}</p>
          <Button className="hover:bg-theme-mauve">
            <a href={currentItem.url} target="_blank" rel="noopener noreferrer">
              {currentItem.labelUrl}
            </a>
          </Button>
        </div>
        {currentItem.image && (
          <img
            src={currentItem.image}
            alt={currentItem.titre}
            className="w-full h-auto object-contain"
          />
        )}
      </div>
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
        <button onClick={handlePrev}>
          <RiArrowLeftLine className="w-8 h-8 text-gray-600 hover:text-gray-800 cursor-pointer" />
        </button>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
        <button onClick={handleNext}>
          <RiArrowRightLine className="w-8 h-8 text-gray-600 hover:text-gray-800 cursor-pointer" />
        </button>
      </div>
    </div>
  );
}
