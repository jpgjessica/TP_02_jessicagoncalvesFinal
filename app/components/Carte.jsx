import Button from './Button';
import {Image} from '@shopify/hydrogen';

export default function Carte({titre, img, href, className}) {
  return (
    <div
      className={`p-4 bg-theme-white transition-shadow flex justify-center ${className}`}
    >
      <div className="flex flex-col w-full items-center">
        <Image
          alt={titre}
          aspectRatio="1/1"
          src={img}
          sizes="(min-width: 45em) 20vw, 50vw"
          className="w-full h-52 object-contain rounded-md mb-4"
        />
        <h3 className="text-xl font-semibold mb-2">{titre}</h3>
        <Button>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-theme-white text-blue-500 hover:underline"
          >
            Visiter le site
          </a>
        </Button>
      </div>
    </div>
  );
}
