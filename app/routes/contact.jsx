import {useLoaderData} from '@remix-run/react';
import FormulaireContact from '~/components/FormulaireContact';
import Marquee from '~/components/Marquee';

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
    <div className="container md:px-16 flex flex-col items-center">
      <Marquee text="Contactez-nous!" className="font-family-serif" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <table className="w-96">
          <tbody>
            <tr className="border-b">
              <th className="text-left font-semibold p-2 bg-gray-100">Email</th>
              <td className="p-2">{contactInfo.Email.value}</td>
            </tr>
            <tr className="border-b">
              <th className="text-left font-semibold p-2 bg-gray-100">
                Téléphone
              </th>
              <td className="p-2">{contactInfo.Phone.value}</td>
            </tr>
            <tr className="border-b">
              <th className="text-left font-semibold p-2 bg-gray-100">
                Adresse
              </th>
              <td className="p-2">{contactInfo.Adresse.value}</td>
            </tr>
            <tr>
              <th className="text-left font-semibold p-2 bg-gray-100">
                Heures d&apos;ouverture
              </th>
              <td className="p-2">{contactInfo.OpenHours.value}</td>
            </tr>
          </tbody>
        </table>
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
