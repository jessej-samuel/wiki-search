import { Results } from "../App";
import "./SearchResults.css";
import { useRef, useState } from "react";
import { FiExternalLink } from "react-icons/fi";

const SearchResults = ({ results }: { results: Results }) => {
  return (
    <div className="w-96">
      <p className="text-xs self-start pl-2">
        {results.searchinfo.totalhits > 0
          ? results.searchinfo.totalhits + " results in " + results.time
          : null}{" "}
      </p>
      <ul className="w-full overflow-y-scroll h-96 min-h-fit">
        {results.search.length > 0
          ? results.search.map((result) => (
              <ResultItem result={result} key={result.pageid} />
            ))
          : null}
      </ul>
    </div>
  );
};

SearchResults.defaultProps = {
  results: {
    search: [
      {
        pageid: 0,
        title: "",
      },
    ],
  },
};

interface Result {
  pageid: number;
  title: string;
  snippet: string;
  timestamp: string;
}

const ResultItem = ({ result }: { result: Result }) => {
  const [hovered, setHovered] = useState<boolean>(true);
  const resRef = useRef<HTMLDivElement>(null);
  const liRef = useRef<HTMLLIElement>(null);
  return (
    <li
      className="my-1 p-4 rounded-sm transition-all  hover:shadow-md bg-neutral-800/50 hover:bg-neutral-800"
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(true);
      }}
      ref={liRef}
    >
      <h2 className="font-bold text-2xl">{result.title}</h2>
      {hovered ? (
        <div className="transition-all my-2 fadein" ref={resRef}>
          <p
            dangerouslySetInnerHTML={{ __html: result.snippet + " ... " }}
            className="text-sm text-white/80 transition-all"
          />

          <div className="w-full flex justify-between mt-4 items-center">
            <time className="text-xs text-white/60 transition-all">
              Last edited on {new Date(result.timestamp).toLocaleDateString()}
            </time>
            <a
              href={`https://en.wikipedia.org/?curid=${result.pageid}`}
              target="_blank"
              rel="noreferrer"
              className="text-sm inline text-blue-500 hover:underline visited:text-fuchsia-500 transition-all flex items-center"
            >
              <FiExternalLink /> Read More
            </a>
          </div>
        </div>
      ) : null}
    </li>
  );
};

export default SearchResults;
