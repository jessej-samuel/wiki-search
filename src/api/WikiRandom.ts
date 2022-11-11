import axios from "axios";

export const getRandomWiki = async () => {
  const response = await axios.get(
    "https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnnamespace=0&rnlimit=5&origin=*"
  );
  return response;
};
