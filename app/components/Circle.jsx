export default function Circle({
  color,
  i,
  isThumbnail = false,
  onColorChange = () => {},
}) {
  return (
    <>
      <button
        className={`${
          isThumbnail ? 'w-[20px] h-[20px]' : 'w-[100px] h-[100px]'
        } rounded-full ${
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
