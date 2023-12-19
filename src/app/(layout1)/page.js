import { Suspense } from 'react';
import Featured from './home/Featured';
import Recently from './home/Recently';
const HomePage = async () => {
    return (
        <div className='px-5 pt-10 max-w-[1500px] mx-auto'>
            <Suspense fallback={<p>Loading...</p>}>
            <Featured />
            </Suspense>
            <Recently />
        </div>
    );
}
export default HomePage;