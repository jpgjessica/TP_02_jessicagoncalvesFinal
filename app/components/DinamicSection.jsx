// import {RiArrowLeftBoxFill, RiArrowRightBoxFill} from '@remixicon/react';
// import {useLoaderData} from '@remix-run/react';
// import {useState} from 'react';

// export async function loader({context}) {
//   const response = await context.storefront.query(ARTICLES_QUERY);
//   console.log(response);
//   return response.data.metaobjects.nodes || [];
// }

// export default function DinamicSection() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const response = useLoaderData();
//   const items = response.map((edge) =>
//     edge.node[0].fields.reduce(
//       (acc, field) => ({
//         ...acc,
//         [field.key]: field.value,
//       }),
//       {},
//     ),
//   );

//   const currentItem = items[currentIndex];
//   const handlePrev = () => {
//     setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev + 1) % items.length);
//   };

//   return (
//     <div className="relative w-full p-4 bg-gray-100">
//       {/* Section affichée */}
//       <div className="flex flex-col items-center text-center">
//         <h2 className="text-xl font-bold mb-2">{currentItem.titre}</h2>
//         <img
//           src={currentItem.image}
//           alt={currentItem.titre}
//           className="w-64 h-64 object-cover mb-4"
//         />
//         <p className="mb-4">{currentItem.description}</p>
//         <a
//           href={currentItem.lien}
//           className="text-blue-600 underline"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           {currentItem.description}
//         </a>
//       </div>

//       {/* Boutons de navigation */}
//       <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
//         <button onClick={handlePrev}>
//           <RiArrowLeftBoxFill className="w-6 h-6 text-gray-600" />
//         </button>
//       </div>
//       <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
//         <button onClick={handleNext}>
//           <RiArrowRightBoxFill className="w-6 h-6 text-gray-600" />
//         </button>
//       </div>
//     </div>
//   );
// }

// const ARTICLES_QUERY = `#graphql
//     query dinamicSectionQuery {
//       metaobjects(type: "section_dinamique", first: 250) {
//           nodes {
//             id
//             title:field(key:"title"){value}
//             description: field(key:"description"){value}
//             linkLabel :field(key:"title"){value}
//             linkUrl:field(key:"title"){value}
//           }
//         }
//       }
//   `;

// {
//     metaobjects(type: "section_dinamique") {
//       edges {
//         node {
//           article_title
//           article_description
//           article_link_label
//           article_link_url
//         }
//       }
//     }
//   }
