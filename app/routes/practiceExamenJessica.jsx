import {useState, useEffect} from 'react';
import CircleGrid from '~/components/CircleGrid';
import Button from '~/components/Button';

export default function PracticeExamenJessica() {
  const defaultValue = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  const [initialColors, setInitialColors] = useState(defaultValue);
  const [thumbnailColors, setThumbnailColors] = useState(defaultValue);
  const [thumbnailColors2, setThumbnailColors2] = useState(defaultValue); //pra um botao thumbnail 2
  const [recoveredSavedColors, setRecoveredSavedColors] =
    useState(defaultValue); //pra um botao load

  function onColorChange(i, color) {
    if (color == 3) {
      color = 0;
    }
    const newColors = [...initialColors];
    newColors[i] = color;
    setInitialColors(newColors); //o setinitialcolors nao aceita receber os valores da initalcolors,
    // nada muda, tive que colocar dentro de uma outro tableau, mas e temporaria, so existe aqui dentro
  }

  useEffect(() => {
    const savedColors = JSON.parse(localStorage.getItem('gridCircles')) ?? [
      0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]; //pra um botao load
    const savedColors2 = JSON.parse(localStorage.getItem('gridCircles2')) ?? [
      0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]; //pra um botao thumbnail 2
    setThumbnailColors2(savedColors2); //pra um botao thumbnail 2
    setInitialColors(savedColors); //pra um botao load
    setRecoveredSavedColors(savedColors); //pra um botao load
  }, []);

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
                setRecoveredSavedColors(initialColors); //pra um botao load
              }}
            />
            <Button
              label={'Save 2'}
              onClick={() => {
                localStorage.setItem(
                  'gridCircles2',
                  JSON.stringify(initialColors),
                );
                setThumbnailColors2(initialColors);
              }} //pra um botao thumbnail 2
            />
            <Button
              label={'Reset'}
              onClick={() => {
                setInitialColors(defaultValue);
              }}
            />
            <Button
              label={'Load'}
              onClick={() => {
                setInitialColors(recoveredSavedColors); //pra um botao load
                setThumbnailColors(recoveredSavedColors); //pra um botao load
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
        <div className="flex flex-col items-center gap-2">
          <h2>Thumbnail</h2>
          <CircleGrid circlesColor={thumbnailColors} isThumbnail={true} />
          <CircleGrid circlesColor={thumbnailColors2} isThumbnail={true} />
        </div>
      </div>
    </div>
  );
}
