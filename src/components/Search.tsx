import React, { useState, useEffect, useRef } from "react";
import WikiAPI from "../api/WikiAPI";
import { FaRandom, FaSearch } from "react-icons/fa";
import { getRandomWiki } from "../api/WikiRandom";
import { useWindowSize, useMouse } from "react-use";
import Confetti from "react-confetti";

const Search = ({
  setResults,
  setRandom,
}: {
  setResults: any;
  setRandom: any;
}) => {
  const { width, height } = useWindowSize();
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const ref = useRef<HTMLFormElement>(null);
  const randomRef = useRef<HTMLButtonElement>(null);

  const [showConfetti, setShowConfetti] = useState(false);

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
    setShowConfetti(true);
    setTimeout(() => {}, 3000);
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
      <button type="reset" onClick={handleRandom} ref={randomRef}>
        <FaRandom className="border border-blue-500 hover:bg-blue-600 h-11 w-11 p-3 rounded transition-all hover:scale-105" />
      </button>
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          className="opacity-100"
          numberOfPieces={150}
          onConfettiComplete={() => setShowConfetti(false)}
          colors={[
            "#03045e",
            "#023e8a",
            "#0077b6",
            "#0096c7",
            "#00b4d8",
            "#48cae4",
            "#90e0ef",
            "#ade8f4",
            "#caf0f8",
          ]}
          recycle={false}
        />
      )}
    </form>
  );
};

export default Search;
