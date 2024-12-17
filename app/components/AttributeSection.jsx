import {attributesData} from '~/data/contentData';
import Button from './Button';
import {NavLink} from '@remix-run/react';

export default function AttributesSection() {
  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6">
          Pourquoi choisir notre boutique ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:px-16">
          {attributesData.map((attr) => {
            return (
              <div
                key={Date.now}
                className="flex flex-col items-center text-center p-4 bg-theme-white"
              >
                <div className={`mb-4 ${attr.iconColor}`}>
                  {attr.icon ? (
                    <attr.icon className="w-12 h-12" />
                  ) : (
                    'Icône indisponible'
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-2">{attr.title}</h3>
                <p className="text-gray-600">{attr.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
