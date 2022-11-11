import { useState, useEffect } from "react";
import WikiAPI from "../api/WikiAPI";
import DebugState from "../utils/DebugState";

const Search = ({ setResults }: { setResults: any }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Handle submit for <form>
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fetchData = async () => {
      const res = await WikiAPI.get("", {
        params: {
          srsearch: searchTerm,
        },
      });
      return res;
    };
    const start = new Date().getTime();
    let end = 0;
    fetchData().then((res) => {
      end = new Date().getTime();
      setSearchTerm("");
      setResults({ ...res.data.query, time: `${(end - start) / 1000}s` });
    });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="my-12 w-96">
      <input
        type={"text"}
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className="bg-neutral-700 border-2 border-neutral-600 focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-opacity-50 rounded-md text-white w-full p-2"
      />
    </form>
  );
};

export default Search;
