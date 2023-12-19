function Categories() {
    return (
        <div>
            <h1 className='my-5'><span className='text-dark-cyan text-xl font-semibold p-2 '>Categories </span></h1>
            <div className="flex flex-col gap-5">
                {
                    [...Array(5)].map(e => <div key={e} className="flex gap-5 justify-between text-lg font-medium max-w-xs">
                        <p>lifestyle</p>
                        <p>09</p>
                    </div>)
                }
            </div>
        </div>
    );
}

export default Categories;