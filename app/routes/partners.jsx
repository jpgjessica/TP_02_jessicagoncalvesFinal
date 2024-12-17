import {useLoaderData} from '@remix-run/react';
import Carte from '~/components/Carte';
import Marquee from '~/components/Marquee';

export async function loader({context}) {
  const data = await context.storefront.query(PARTNERS_QUERY, {});
  return {partenaires: data.metaobjects.nodes};
}

export default function Partners() {
  const partenaires = useLoaderData().partenaires;

  return (
    <div className="container md:px-16 flex flex-col items-center">
      <Marquee text="Nos partenaires" className="font-family-serif" />
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {partenaires.map((partenaire) => (
          <Carte
            key={partenaire.id}
            titre={partenaire.Name.value}
            img={partenaire.LogoImage.value}
            href={partenaire.Url.value}
          />
        ))}
      </div>
    </div>
  );
}

const PARTNERS_QUERY = `#graphql
query partenaires {
  metaobjects(first: 250, type: "partenaires") {
    nodes {
      id
      Name: field(key: "partner_name") {
        value
      }
      LogoImage: field(key: "partner_logo") {
        value
      }
      Url: field(key: "partner_website_url") {
        value
      }
    }
  }
}`;
