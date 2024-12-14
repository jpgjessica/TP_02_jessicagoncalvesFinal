import {useState} from 'react';

export default function Circle({
  initialCount,
  i,
  isThumbnail = false,
  onColorChange = () => {},
}) {
  const [colorIndex, setColorIndex] = useState(initialCount);

  function changeColor(newColorIndex) {
    if (newColorIndex == 3) {
      newColorIndex = 0;
    }
    setColorIndex(newColorIndex);
    onColorChange(i, newColorIndex);
  }

  return (
    <>
      <button
        className={`w-[100px] h-[100px] rounded-full ${
          colorIndex == 0
            ? 'bg-theme-mauve-fonce'
            : colorIndex == 1
            ? 'bg-theme-rouge-fonce'
            : 'bg-theme-vert-fonce'
        } `}
        onClick={() => {
          if (isThumbnail == false) {
            changeColor(colorIndex + 1);
          }
        }}
      ></button>
    </>
  );
}
