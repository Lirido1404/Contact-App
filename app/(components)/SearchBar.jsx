"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

function SearchBar(placeholder) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("contact", term);
    } else {
      params.delete("contact");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium sr-only dark:text-white">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          id="default-search"
          type="search"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          className="block w-full p-2 ps-10 text-sm rounded-[100px] bg-[#1C1C1E] sm:w-[27rem] border-[0.5px] border-ring"
          placeholder="Search ..."
          required
          defaultValue={searchParams.get("contact")?.toString()}
        />
      </div>
    </div>
  );
}

export default SearchBar;
