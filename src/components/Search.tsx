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
      setResults({ ...res.data.query, time: `${(end - start)/1000}s` });
    });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type={"search"}
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <DebugState state={searchTerm} name="search" />
    </form>
  );
};

export default Search;
