import Circle from './Circle';

export default function CircleGrid({
  isThumbnail = false,
  circlesColor,
  onColorChange,
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
          index={i}
          onColorChange={onColorChange}
          isThumbnail={isThumbnail}
        />
      ))}
    </div>
  );
}
