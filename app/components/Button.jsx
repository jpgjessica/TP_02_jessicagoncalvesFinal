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
      className={`mt-2 w-full py-3 px-10 rounded-2xl bg-theme-noir text-theme-white hover:bg-theme-mauve-fonce font-semi-bold text-sm flex flex-row justify-center items-center gap-2 cursor-pointer transition ${className}`}
    >
      {children}
      {label}
    </button>
  );
}
