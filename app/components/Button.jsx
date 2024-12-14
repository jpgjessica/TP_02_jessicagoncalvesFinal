export default function Button({
  label,
  onClick,
  className = '',
  type = 'button',
  children,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`mt-4 w-full md:py-1 py-2 px-4 border-2 border-black rounded-2xl bg-white text-black font-semi-bold text-sm flex flex-row justify-center items-center gap-2 cursor-pointer hover:bg-gray-100 transition ${className}`}
    >
      {children}
      {label}
    </button>
  );
}
