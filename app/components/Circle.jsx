export default function Circle({
  color,
  index,
  isThumbnail = false,
  onColorChange,
}) {
  return (
    <>
      <button
        className={`${
          isThumbnail ? 'w-[20px] h-[20px]' : 'w-[100px] h-[100px]'
        } rounded-full ${
          color == 0
            ? 'bg-theme-vert'
            : color == 1
            ? 'bg-theme-jaune'
            : 'bg-theme-rouge'
        } `}
        onClick={() => {
          if (isThumbnail == false) {
            onColorChange(index, color + 1);
          }
        }}
      ></button>
    </>
  );
}
