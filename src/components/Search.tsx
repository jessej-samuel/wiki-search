import React, { useState, useEffect, useRef } from "react";
import WikiAPI from "../api/WikiAPI";
import DebugState from "../utils/DebugState";
import { FaRandom, FaSearch } from "react-icons/fa";
import { getRandomWiki } from "../api/WikiRandom";

const Search = ({
  setResults,
  setRandom,
}: {
  setResults: any;
  setRandom: any;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const ref = useRef<HTMLFormElement>(null);

  // Fetches the search results from the API
  const fetchData = async () => {
    const res = await WikiAPI.get("", {
      params: {
        srsearch: searchTerm,
      },
    });
    console.log(res);
    return res;
  };

  useEffect(() => {
    if (window) {
      window.addEventListener("keydown", (e) => {
        if (e.key === "/") {
          e.preventDefault();
          inputRef.current?.focus();
        }
      });
    }
  }, []);

  // Handle submit for <form>
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setResults({ search: [] });
    setRandom(false);
    const start = new Date().getTime();
    let end = 0;
    fetchData().then((res) => {
      end = new Date().getTime();

      setResults({ ...res.data.query, time: `${(end - start) / 1000}s` });
    });
  };

  // Handle submit for random button
  const handleRandom = (e: any) => {
    e.preventDefault();
    let start = new Date().getTime();
    let end = 0;
    setResults({ search: [] });
    setRandom(true);
    getRandomWiki()
      .then((res) => {
        end = new Date().getTime();
        setResults({
          ...res.data.query,
          time: `${(end - start) / 1000}s`,
          search: res.data.query.random,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
        console.log("submittin");
      }}
      ref={ref}
      className="mt-12 mb-4 w-96 flex gap-x-2"
    >
      <input
        type={"text"}
        value={searchTerm}
        onClick={() => {
          inputRef.current?.select();
        }}
        ref={inputRef}
        onChange={(event) => setSearchTerm(event.target.value)}
        className="bg-neutral-800/50 focus:bg-neutral-800 border-2 border-neutral-600 focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-opacity-50 rounded-md text-white w-full p-2"
        placeholder="Search Wikipedia"
        autoFocus
      />
      {searchTerm.length > 0 && (
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          <FaSearch className="bg-blue-600 hover:bg-blue-500 h-11 w-11 p-3 rounded transition-all hover:scale-105" />
        </button>
      )}
      <button type="reset" onClick={handleRandom}>
        <FaRandom className="border border-blue-500 hover:bg-blue-600 h-11 w-11 p-3 rounded transition-all hover:scale-105" />
      </button>
    </form>
  );
};

export default Search;
