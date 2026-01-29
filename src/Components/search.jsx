import React from "react";

export default function SearchBar({
  search,
  setSearch,
  onSearch,
  placeholder = "Search...",
}) {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch();
          }
        }}
        placeholder={placeholder}
        className="border px-3 py-2 rounded w-64"
      />
      <button
        onClick={onSearch}
        className="bg-gray-700 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
}
