import { useEffect } from "react";
import { Results } from "../App";

const SearchResults = ({ results }: { results: Results }) => {
  useEffect(() => {
    console.log(results);
  }, [results]);

  return (
    <div>
      <h5>Search results</h5>
      <ul>
        {results.search.length > 0
          ? results.search.map((result) => (
              <li key={result.pageid}>{result.title}</li>
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

export default SearchResults;
