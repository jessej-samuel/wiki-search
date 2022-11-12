import Search from "./components/Search";

import { Key, useState } from "react";
import SearchResults from "./components/SearchResults";
import AppHeader from "./ui/AppHeader";
import AppFooter from "./ui/AppFooter";

export interface Results {
  search: {
    id: Key | null | undefined;
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
  time: string;
}

function App() {
  const [results, setResults] = useState({
    search: [],
    searchinfo: { totalhits: 0, suggestion: "" },
  } as unknown as Results);
  const [random, setRandom] = useState(false);

  return (
    <div className="bg-neutral-900 flex flex-col items-center pt-12 text-white min-h-screen w-screen">
      <div className="flex flex-col items-center justify-center">
        <AppHeader />
        <Search setResults={setResults} setRandom={setRandom} />
        <SearchResults results={results} _random={random} />
        <AppFooter />
      </div>
    </div>
  );
}

export default App;
