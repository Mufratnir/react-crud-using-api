import React from "react";

export default function Pagination({
  meta,
  onPageChange,
}) {
  if (!meta) return null;

  const { current_page, last_page } = meta;

  const goTo = (page) => {
    if (page < 1 || page > last_page) return;
    onPageChange(page);
  };

  return (
    <div className="flex justify-between items-center mt-4">
      <p className="text-sm text-gray-600">
        Page {current_page} of {last_page}
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={() => goTo(current_page - 1)}
          disabled={current_page === 1}
          className="w-10 h-10 border rounded flex items-center justify-center disabled:opacity-40"
        >
          ‹
        </button>

        {[...Array(last_page)].map((_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => goTo(pageNum)}
              className={`w-10 h-10 rounded flex items-center justify-center border
                ${
                  current_page === pageNum
                    ? "bg-blue-400 text-white border-blue-400"
                    : "hover:bg-gray-100"
                }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => goTo(current_page + 1)}
          disabled={current_page === last_page}
          className="w-10 h-10 border rounded flex items-center justify-center disabled:opacity-40"
        >
          ›
        </button>
      </div>
    </div>
  );
}
