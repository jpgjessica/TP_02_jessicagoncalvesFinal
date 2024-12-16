import Accordion from './Accordion';
import {useState} from 'react';

export default function Accordions({accordions = []}) {
  const [currentAccordionId, setCurrentAccordionId] = useState(0);

  function onAccordionClick(accordionId) {
    if (currentAccordionId == accordionId) {
      setCurrentAccordionId(0);
      return;
    }
    setCurrentAccordionId(accordionId);
  }

  return (
    <div>
      {accordions.map((accordion) => (
        <Accordion
          key={accordion.id}
          title={accordion.title}
          content={accordion.content}
          isOpen={currentAccordionId === accordion.id}
          onClick={() => onAccordionClick(accordion.id)}
        />
      ))}
    </div>
  );
}
