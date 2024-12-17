import React from 'react';
import Button from './Button';
import {RiArrowRightLine} from '@remixicon/react';
import skate_blog01 from '~/assets/imgBlog/skate_blog01.jpg';
import {NavLink} from '@remix-run/react';

export default function Banner() {
  return (
    <div className="relative">
      <img
        src={skate_blog01}
        className="md:relative md:px-16 w-full md:h-[450px] object-cover rounded-br-[150px] md:rounded-br-[350px] overflow-hidden filter grayscale"
        alt="Une personne avec un skateboard dans la rue."
      />
      <div className="md:absolute inset-0 bg-opacity-50 flex flex-col justify-center items-start p-4 md:pl-24">
        <h2 className="relative text-2xl md:text-5xl font-bold mb-2 uppercase font-sans text-left p-2 overflow-hidden group">
          <span className="relative z-10">
            Des <strong>boards</strong> qui <br />
            parlent de <strong>vous!</strong>
          </span>
          <div className="absolute inset-0 bg-theme-mauve-fonce scale-x-0 transform origin-bottom-left transition-transform duration-300 ease-in-out group-hover:scale-x-100"></div>
        </h2>

        <p className="text-lg md:text-xl mb-6 text-left bg-theme-gris">
          Créez des <strong>souvenirs</strong> sur des{' '}
          <strong>boards uniques.</strong>
        </p>
        <div className="flex flex-row gap-4">
          <NavLink to="/collections/all">
            <Button
              label="Nos produits"
              className="bg-theme-vert text-black
              border-black hover:bg-theme-vert-fonce font-sans w-full"
            >
              <RiArrowRightLine />
            </Button>
          </NavLink>
          <NavLink to="/collections/all">
            <Button
              label="A propos"
              className="bg-theme-jaune text-black
              border-black hover:bg-theme-jaune-fonce font-sans w-full"
            >
              <RiArrowRightLine />
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
