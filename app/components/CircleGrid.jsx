export default function CircleGrid({
  isThumbnail = false,
  circlesColor = [0, 0, 0, 0, 0, 0, 0, 0, 0],
  onColorChange = () => {},
}) {
  return (
    <div className="grid grid-cols-3 grid-rows-3 w-auto justify-items-center items-center gap-11 ">
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

function Circle({color, i, isThumbnail = false, onColorChange = () => {}}) {
  return (
    <>
      <button
        className={`w-[100px] h-[100px] rounded-full ${
          color == 0
            ? 'bg-theme-mauve-fonce'
            : color == 1
            ? 'bg-theme-rouge-fonce'
            : 'bg-theme-vert-fonce'
        } `}
        onClick={() => {
          if (isThumbnail == false) {
            onColorChange(i, color + 1);
          }
        }}
      ></button>
    </>
  );
}
