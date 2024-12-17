import {useLoaderData} from '@remix-run/react';
import FormulaireContact from '~/components/FormulaireContact';

export async function loader({context}) {
  const data = await context.storefront.query(CONTACT_QUERY, {});
  return {contactInfo: data.metaobjects.nodes[0]};
}

export async function action({request}) {
  return {success: true};
}

export default function Contact() {
  const contactInfo = useLoaderData().contactInfo;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        {contactInfo.Name.value}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <p>Email: {contactInfo.Email.value}</p>
          <p>Téléphone: {contactInfo.Phone.value}</p>
          <p>Adresse: {contactInfo.Adresse.value}</p>
          <p>Heures d&apos;ouverture: {contactInfo.OpenHours.value}</p>
        </div>
        <div>
          <FormulaireContact />
        </div>
      </div>
    </div>
  );
}

const CONTACT_QUERY = `#graphql
query contact {
  metaobjects(first: 250, type: "contact") {
    nodes {
      id
      Name: field(key: "contact_name") {
        value
      }
      Email: field(key: "contact_email") {
        value
      }
      Phone: field(key: "contact_phone") {
        value
      }
      Adresse: field(key: "contact_address") {
        value
      }
      OpenHours: field(key: "contact_open_hours") {
        value
      }
    }
  }
}`;
