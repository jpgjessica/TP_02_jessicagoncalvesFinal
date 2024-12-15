import Circle from './Circle';

export default function CircleGrid({
  isThumbnail = false,
  circlesColor = [0, 0, 0, 0, 0, 0, 0, 0, 0],
  onColorChange = () => {},
}) {
  return (
    <div
      className={`grid grid-cols-3 grid-rows-3 w-auto justify-items-center items-center ${
        isThumbnail ? 'gap-1' : 'gap-11 '
      }`}
    >
      {circlesColor.map((circleColor, i) => (
        <Circle
          key={i}
          color={circleColor}
          i={i}
          onColorChange={onColorChange}
          isThumbnail={isThumbnail}
        />
      ))}
    </div>
  );
}
