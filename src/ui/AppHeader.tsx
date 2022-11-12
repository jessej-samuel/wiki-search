import GithubLink from "./GithubLink";

const AppHeader = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-6xl font-bold my-2">
        <span className="text-blue-500">Wiki</span>Search
      </h1>
      <GithubLink />
    </div>
  );
};

export default AppHeader;
