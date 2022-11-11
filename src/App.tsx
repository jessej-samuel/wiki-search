import Search from "./components/Search";

import { useState } from "react";
import SearchResults from "./components/SearchResults";

export interface Results {
  query: any;
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

  return (
    <div className="App">
      <Search setResults={setResults} />
      <SearchResults results={results} />
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  );
}

export default App;
