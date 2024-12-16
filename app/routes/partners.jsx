import {useLoaderData} from '@remix-run/react';
import Carte from '~/components/Carte';

export async function loader({context}) {
  const data = await context.storefront.query(PARTNERS_QUERY, {});
  return {partenaires: data.metaobjects.nodes};
}

export default function Partners() {
  const partenaires = useLoaderData().partenaires;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Nos Partenaires</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {partenaires.map((partenaire) => (
          <Carte
            key={partenaire.id}
            titre={partenaire.Name.value}
            img={partenaire.LogoImage.value}
            href={partenaire.Url.value}
            className="hover:border-theme-jaune"
          />
        ))}
      </div>
    </div>
  );
}

// GraphQL Query
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
