import CountUp from 'react-countup';

function TodaysUpdate() {
    return (
        <div>
            <h1 className='my-5'><span className='text-dark-cyan text-xl font-semibold p-2 '>Today’s</span> update</h1>
            <div className="flex flex-wrap gap-5 max-w-xs">
                {
                    [...Array(4)].map(e => <div key={e} className="flex flex-col gap-5 text-lg font-medium justify-center items-center w-[45%]">
                        <p className='text-dark-cyan font-semibold text-xl'><CountUp
                            end={100}
                            duration={2.75}
                            enableScrollSpy={true}
                        /></p>
                        <p>New posts</p>
                    </div>)
                }
            </div>
        </div>
    );
}

export default TodaysUpdate;