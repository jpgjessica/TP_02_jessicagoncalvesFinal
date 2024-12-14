import Circle from './circle';
import {useState} from 'react';
import Button from './Button';
import {useEffect} from 'react';

export default function CircleGrid() {
  const defaultValue = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  const [initialColors, setInitialColors] = useState(defaultValue);

  useEffect(() => {
    setInitialColors(
      JSON.parse(localStorage.getItem('gridCircles')) ?? defaultValue,
    );
  }, [defaultValue]);

  function onColorChange(i, color) {
    initialColors[i] = color;
    setInitialColors(initialColors);
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <Button
          label={'Save'}
          onClick={() => {
            localStorage.setItem('gridCircles', JSON.stringify(initialColors));
          }}
        />
        <Button
          label={'Reset'}
          onClick={() => {
            localStorage.setItem('gridCircles', JSON.stringify(defaultValue));
            setInitialColors(defaultValue);
          }}
        />
      </div>

      <div className="grid grid-cols-3 grid-rows-3 w-auto justify-items-center items-center gap-11 ">
        {initialColors.map((initialcolor, i) => (
          <Circle
            key={i}
            initialCount={initialcolor}
            i={i}
            onColorChange={onColorChange}
          />
        ))}
      </div>
    </div>
  );
}
