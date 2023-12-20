import SearchResult from "./SearchResult";

function SearchPage({params}) {
    
    return (
        <div>
            <SearchResult value={params.value} />
        </div>
    );
}

export default SearchPage;