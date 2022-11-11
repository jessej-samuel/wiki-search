import Search from "./components/Search";

import { useState } from "react";
import SearchResults from "./components/SearchResults";
import AppHeader from "./ui/AppHeader";
import AppFooter from "./ui/AppFooter";


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
  time: string;
}

function App() {
  const [results, setResults] = useState({
    search: [],
    searchinfo: { totalhits: 0, suggestion: "" },
  } as unknown as Results);

  return (
    <div className="bg-neutral-800 flex flex-col items-center pt-12 text-white min-h-screen min-w-[100vw] w-96 p-4">
      <AppHeader />
      <Search setResults={setResults} />
      
      <SearchResults results={results} />
      <AppFooter />
    </div>
  );
}

export default App;
