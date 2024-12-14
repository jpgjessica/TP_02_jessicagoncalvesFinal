import React from 'react';
import {useNavigate} from 'react-router-dom';
import Button from './Button';
import {RiArrowRightBoxLine} from '@remixicon/react';
import skate_blog01 from '~/assets/imgBlog/skate_blog01.jpg';

export default function Banner() {
  let navigate = useNavigate();
  const routeChange = (path) => {
    navigate(path);
  };

  return (
    <div className="relative">
      <img
        src={skate_blog01}
        className="md:relative md:px-16 w-full md:h-[450px] object-cover rounded-br-[150px] md:rounded-br-[350px] overflow-hidden filter grayscale"
        alt="Une personne dans un skateboard dans la rue."
      />
      {/* Contenu à l'intérieur de la bannière */}
      <div className="md:absolute inset-0 bg-opacity-50 flex flex-col justify-center items-start p-4 md:pl-24">
        <h2 className="relative text-2xl md:text-5xl font-bold mb-2 uppercase font-serif text-left p-2 overflow-hidden group">
          <span className="relative z-10">
            Des boards qui <br />
            parlent de vous!
          </span>
          <div className="absolute inset-0 bg-theme-mauve-fonce scale-x-0 transform origin-bottom-left transition-transform duration-300 ease-in-out group-hover:scale-x-100"></div>
        </h2>

        <p className="text-lg md:text-xl mb-6 text-left bg-theme-gris">
          Créez des <strong>souvenirs</strong> sur des{' '}
          <strong>boards uniques.</strong>
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Bouton principal */}
          <Button
            label="Nos produits"
            onClick={() => routeChange('../collections/all')}
            className="bg-theme-vert text-black border-black hover:bg-theme-vert-fonce font-sans"
          >
            <RiArrowRightBoxLine />
          </Button>
          {/* Bouton secondaire */}
          <Button
            label="A propos de nous"
            onClick={() => routeChange('../faq')}
            className="bg-theme-jaune text-white border-white hover:bg-theme-jaune-fonce"
          >
            <RiArrowRightBoxLine />
          </Button>
        </div>
      </div>
    </div>
  );
}
