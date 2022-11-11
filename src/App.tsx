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
    <div className="App">
      <Search setResults={setResults} />
      <SearchResults results={results} />
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  );
}

export default App;
