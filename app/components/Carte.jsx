import Button from './Button';
import {Image} from '@shopify/hydrogen';

export default function Carte({titre, img, href, className}) {
  return (
    <div
      className={`p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow ${className}`}
    >
      <Image
        alt={titre}
        aspectRatio="1/1"
        src={img}
        sizes="(min-width: 45em) 20vw, 50vw"
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold mb-2">{titre}</h3>
      <Button
        label="A propos"
        className="bg-theme-jaune text-black
              border-black hover:bg-theme-jaune-fonce font-sans w-full"
      >
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Visiter le site
        </a>
      </Button>
    </div>
  );
}
