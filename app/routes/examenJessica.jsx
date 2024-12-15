import {useState, useEffect} from 'react';
import CircleGrid from '~/components/CircleGrid';
import Button from '~/components/Button';

export default function examenJessica() {
  const defaultValue = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  const [initialColors, setInitialColors] = useState(defaultValue);
  const [thumbnailColors, setThumbnailColors] = useState(defaultValue);

  useEffect(() => {
    const recoveredSavedColors = JSON.parse(
      localStorage.getItem('gridCircles'),
    ) ?? [0, 0, 0, 0, 0, 0, 0, 0, 0];
    setInitialColors(recoveredSavedColors);
    setThumbnailColors(recoveredSavedColors);
  }, []);

  function onColorChange(i, color) {
    if (color == 3) {
      color = 0;
    }
    const newColors = [...initialColors];
    newColors[i] = color;
    setInitialColors(newColors);
  }

  return (
    <div className="flex justify-center gap-14">
      <div className="flex flex-row justify-center gap-36">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4">
            <Button
              label={'Save'}
              onClick={() => {
                localStorage.setItem(
                  'gridCircles',
                  JSON.stringify(initialColors),
                );
                setThumbnailColors(initialColors);
              }}
            />
            <Button
              label={'Reset'}
              onClick={() => {
                setInitialColors(defaultValue);
              }}
            />
          </div>
          <div className="flex">
            <CircleGrid
              circlesColor={initialColors}
              onColorChange={onColorChange}
            />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h2>Thumbnail</h2>
          <CircleGrid circlesColor={thumbnailColors} isThumbnail={true} />
        </div>
      </div>
    </div>
  );
}
