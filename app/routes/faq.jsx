import {useState} from 'react';
import SearchInput from '~/components/SearchInput';
import Marquee from '~/components/Marquee';
import {faqs} from '~/data/faqs';
import Accordions from '~/components/Accordions';

export default function Faq() {
  const [searchValue, setSearchValue] = useState('');

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
