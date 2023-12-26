import SearchResult from "./SearchResult";

export const metadata = {
  title: "Search - Write Something",
  description: "Write Something",
};

function SearchPage({ params }) {
  return (
    <div>
      <SearchResult value={params.value} />
    </div>
  );
}

export default SearchPage;
