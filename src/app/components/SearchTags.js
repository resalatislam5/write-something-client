function SearchTags() {
    return (
        <div>
            <h1 className='my-5 '><span className='text-dark-cyan text-xl font-semibold p-2 '>Search</span> with tags</h1>
            <div className="flex flex-wrap gap-5 max-w-xs">
                {
                    [...Array(7)].map(e => <div key={e} className="flex gap-5 text-lg font-medium flex-wrap text-davy-gray">
                        <button className='border py-1 px-2 hover:bg-dark-cyan hover:text-white'>Travel</button>
                    </div>)
                }
            </div>
        </div>
    );
}

export default SearchTags;