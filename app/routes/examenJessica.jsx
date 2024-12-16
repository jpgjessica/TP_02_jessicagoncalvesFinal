import {useState, useEffect} from 'react';
import CircleGrid from '~/components/CircleGrid';
import Button from '~/components/Button';

export default function ExamenJessica() {
  const defaultValue = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  const [colors, setColors] = useState(defaultValue);
  const [thumbnailColors, setThumbnailColors] = useState(defaultValue);
  const [thumbnails, setThumbnails] = useState([defaultValue]);

  function onColorChange(i, color) {
    if (color == 3) {
      color = 0;
    }
    const newColors = [...colors];
    newColors[i] = color;
    setColors(newColors); //o setinitialcolors nao aceita receber os valores da initalcolors,
    // nada muda, tive que colocar dentro de uma outro tableau, mas e temporaria, so existe aqui dentro
  }

  useEffect(() => {
    const recoveredSavedColors = JSON.parse(
      localStorage.getItem('gridCircles'),
    ) ?? [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const recoveredSavedColors2 =
      JSON.parse(localStorage.getItem('gridCircles2')) ?? thumbnails;
    setColors(recoveredSavedColors);
    setThumbnailColors(recoveredSavedColors);
    setThumbnails(recoveredSavedColors2);
  }, []);

  return (
    <div className="flex justify-center gap-14">
      <div className="flex flex-row justify-center gap-36">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4">
            <Button
              label={'Save'}
              onClick={() => {
                localStorage.setItem('gridCircles', JSON.stringify(colors));
                setThumbnailColors(colors);
              }}
            />
            <Button
              label={'Save 2'}
              onClick={() => {
                localStorage.setItem('gridCircles2', JSON.stringify([colors]));
                // setThumbnailColors(colors);
                // setThumbnailColors2([[]]);
              }}
            />
            <Button
              label={'Reset'}
              onClick={() => {
                setColors(defaultValue);
              }}
            />
          </div>
          <div className="flex">
            <CircleGrid circlesColor={colors} onColorChange={onColorChange} />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h2>Thumbnail</h2>
          <CircleGrid circlesColor={thumbnailColors} isThumbnail={true} />
          {thumbnails.map((thumbnail, i) => (
            <CircleGrid
              key={i}
              circlesColor={thumbnailColors}
              isThumbnail={true}
            />
          ))}
          ;
        </div>
      </div>
    </div>
  );
}
