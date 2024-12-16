import {useState} from 'react';
import SearchInput from '~/components/SearchInput';
import Marquee from '~/components/Marquee';
import {faqs} from '~/data/faqs';
import Accordions from '~/components/Accordions';
import {useLoaderData} from '@remix-run/react';

export async function loader({context}) {
  const data = await context.storefront.query(FAQ_QUERY, {});
  return {products: data.nodes};
}

export default function Faq() {
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState(useLoaderData());

  function onSearch(e) {
    setSearchValue(e.target.value);
  }

  return (
    <div className="flex flex-col items-center justify-center px-4  max-w-[1079px] w-full mx-auto">
      <div className="flex flex-row justify-between items-center w-full gap-5">
        <Marquee text="FAQ" className="font-family-serif" />
        <SearchInput onSearch={onSearch} />
      </div>

      <div className="flex flex-col gap-3 w-full">
        <Accordions
          accordions={faqs
            .filter((faq) => {
              if (!searchValue) {
                return true;
              }
              return faq.question.includes(searchValue);
            })
            .map((faq) => {
              return {id: faq.id, title: faq.question, content: faq.answer};
            })}
        />
      </div>
    </div>
  );
}

// faqs: metaobjects(type: "faq") {
//   edges {
//     node {
//       faq_id
//       faq_question
//       faq_answer
//     }
//   }
// }

const FAQ_QUERY = `#graphql
query Faq{
  metaobjects(first: 250, type: "faq"){
    nodes {id
    question: field(key: "faq_question"){
      value
    }
    answer: field(key: "faq_answer"){
      value
    }
    }
  }
}
`;
