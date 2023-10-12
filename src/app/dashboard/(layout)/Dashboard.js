import Image from 'next/image';
import dashboard_photo from '../../ass/dashboard_photo.png'
function Dashboard() {
    return (
        <div>
            <div className="lg:ml-96 ml-52 max-w-7xl pt-6">
                <div className='flex justify-between bg-dark-cyan rounded-xl p-5 '>
                    <div className='flex flex-col justify-around text-lg text-gray-200'>
                        <p className=''>September 4, 2023</p>
                        <div className="">
                            <h2 className='text-white text-3xl'>Welcome back, John!</h2>
                            <p>Always stay updated in your blog portal</p>
                        </div>
                    </div>
                    <Image src={dashboard_photo} alt="Photo" />
                </div>
                <div className='mt-10'>
                    <p className='text-lg font-bold'>Analytics</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;