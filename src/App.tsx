import React from "react";
import logo from "./logo.svg";
import Search from "./components/Search";

import { useState } from "react";
import SearchResults from "./components/SearchResults";

export interface Results {
  search: {
    pageid: number;
    title: string;
  }[];
}

function App() {
  const [results, setResults] = useState({
    search: [
      {
        pageid: 0,
        title: "",
      },
    ],
  } as Results);

  const updateResults = (results: any) => {
    setResults(results);
  };

  return (
    <div className="App">
      <Search setResults={setResults} />
      <SearchResults results={results} />
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  );
}

export default App;
