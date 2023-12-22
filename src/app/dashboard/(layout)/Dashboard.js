'use client'
import Image from 'next/image';
import dashboard_photo from '../../ass/dashboard_photo.png'
import posticon from '../../ass/post.svg'
import likeicon from '../../ass/like-and-love.svg'
import commenticon from '../../ass/comment.svg'
import bookmarkicon from '../../ass/bookmarks.svg'
import dislikekicon from '../../ass/dislike.svg'
import { useContext } from 'react';
import AuthContext from '@/contexts/authContext';
import CountUp from 'react-countup';
import DashboardContext from '@/contexts/dashboardContext';

function Dashboard() {
    const { user } = useContext(AuthContext)
    const { UserProfileInfo } = useContext(DashboardContext)
    console.log(UserProfileInfo);
    return (
        <div>
            <div className="lg:ml-96 sm:ml-60 ml-24 max-w-7xl pt-6 px-5">
                <div className='flex flex-col xl:flex-row xl:gap-5 gap-10 justify-between bg-dark-cyan rounded-xl p-5 '>
                    <div className='flex flex-col sm:gap-5 gap-3 justify-around sm:text-lg text-sm text-gray-200 order-2 xl:order-1'>
                        <p className=''>{user?.createdAt?.slice(0,10)}</p>
                        <div className="flex flex-col gap-2">
                            <h2 className='text-white sm:text-3xl text-xl'>Welcome back, {user?.name}</h2>
                            <p>Always stay updated in your blog portal</p>
                        </div>
                    </div>
                    <div className="order-1 xl:order-2">
                        <Image src={dashboard_photo} alt="Photo" />
                    </div>
                </div>
                <div className='my-10'>
                    <p className='text-lg font-bold pb-5'>Analytics</p>
                    <div className='flex gap-5 flex-wrap justify-center lg:justify-start'>
                        <div className='sm:w-80 w-52 border-4 border-white shadow-md hover:border-dark-cyan p-10 rounded-lg'>
                            <div className='flex flex-col items-center'>
                                <Image className='w-52 text-green-500' src={posticon} alt="" />
                                <h2 className='text-2xl font-bold'><CountUp
                            end={UserProfileInfo.post?.length}
                            duration={2.75}
                            enableScrollSpy={true}
                        /></h2>
                                <p className="text-xl text-davy-gray">Total Posts</p>
                            </div>
                        </div>
                        <div className='sm:w-80 w-52 border-4 border-white shadow-md hover:border-dark-cyan p-10 rounded-lg'>
                            <div className='flex flex-col items-center'>
                                <Image className='w-52 fill-white' src={likeicon} alt="" />
                                <h2 className='text-2xl font-bold'><CountUp
                                                end={0}
                                                duration={2.75}
                                                enableScrollSpy={true}
                                            /></h2>
                                <p className="text-xl text-davy-gray">Total Likes</p>
                            </div>
                        </div>
                        <div className='sm:w-80 w-52 border-4 border-white shadow-md hover:border-dark-cyan p-10 rounded-lg'>
                            <div className='flex flex-col items-center'>
                                <Image className='w-52' src={commenticon} alt="" />
                                <h2 className='text-2xl font-bold'><CountUp
                                    end={0}
                                    duration={2.75}
                                    enableScrollSpy={true}
                                /></h2>
                                <p className="text-xl text-davy-gray">Total Comments</p>
                            </div>
                        </div>
                        <div className='sm:w-80 w-52 border-4 border-white shadow-md hover:border-dark-cyan p-10 rounded-lg'>
                            <div className='flex flex-col items-center'>
                                <Image className='w-52' src={bookmarkicon} alt="" />
                                <h2 className='text-2xl font-bold'><CountUp
                                    end={UserProfileInfo.bookmark?.length}
                                    duration={2.75}
                                    enableScrollSpy={true}
                                /></h2>
                                <p className="text-xl text-davy-gray">Total Bookmarks</p>
                            </div>
                        </div>
                        <div className='sm:w-80 w-52 border-4 border-white shadow-md hover:border-dark-cyan p-10 rounded-lg'>
                            <div className='flex flex-col items-center'>
                                <Image className='w-52' src={dislikekicon} alt="" />
                                <h2 className='text-2xl font-bold'><CountUp
                                    end={0}
                                    duration={2.75}
                                    enableScrollSpy={true}
                                /></h2>
                                <p className="text-xl text-davy-gray">Total Dislikes</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;