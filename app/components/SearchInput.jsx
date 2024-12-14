export default function SearchInput({onSearch = () => {}}) {
  return (
    <div>
      <div className="my-4 flex justify-center w-[360px]">
        <input
          type="text"
          placeholder="Rechercher une question..."
          id="search"
          onInput={onSearch}
          className="p-2 rounded-full border border-gray-300 w-full max-w-md"
        />
      </div>
    </div>
  );
}
