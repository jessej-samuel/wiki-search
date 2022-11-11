import Search from "./components/Search";

import { useState } from "react";
import SearchResults from "./components/SearchResults";

export interface Results {
  search: {
    pageid: number;
    title: string;
    wordcount: number;
    snippet: string;
    timestamp: string;
  }[];
  searchinfo: {
    totalhits: number;
    suggestion: string;
  };
}

function App() {
  const [results, setResults] = useState({
    search: [],
  } as unknown as Results);

  return (
    <div className="bg-neutral-800 flex flex-col items-center pt-12 text-white min-h-screen">
      <Search setResults={setResults} />
      <SearchResults results={results} />
    </div>
  );
}

export default App;
