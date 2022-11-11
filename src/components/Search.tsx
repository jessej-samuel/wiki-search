import { useState, useEffect } from "react";
import WikiAPI from "../api/WikiAPI";
import DebugState from "../utils/DebugState";

const Search = ({ setResults }: { setResults: any }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // COntrol the search term
  useEffect(() => {
    console.log(searchTerm);
  }, [searchTerm]);

  // Handle submit for <form>
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fetchData = async () => {
      const res = await WikiAPI.get("", {
        params: {
          srsearch: searchTerm,
        },
      });
      return res.data;
    };
    const res = await fetchData();

    setResults(res);
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
