'use client'
import Image from 'next/image';
import { SlCalender } from 'react-icons/sl';
import { BsFillBookmarkHeartFill } from 'react-icons/bs';
import { FcLikePlaceholder, FcLike } from 'react-icons/fc';
import { RiDislikeFill, RiDislikeLine } from 'react-icons/ri';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import PaginatedItems from './PaginatedItems';
import TopAuthors from '@/app/components/TopAuthors';
import Ads from '@/app/components/Ads';
import Categories from '@/app/components/Categories';
import TodaysUpdate from '@/app/components/TodaysUpdate';
import SearchTags from '@/app/components/SearchTags';
import AuthContext from '@/contexts/authContext';

function Recently({ itemsPerPage }) {
    const [pagePost, setPagePost] = useState([])
    const [postCountStart, setPostCountStart] = useState(0)
    const [postCountEnd, setPostCountEnd] = useState(10)
    const { handleLikes, handleDislikes, handleBookmark, user } = useContext(AuthContext)
    // pagination 
    const RecentlyData = async () => {
        const res = await fetch(`https://write-something-server.vercel.app/home/recently?page=${postCountStart}`)
        const data = await res.json()
        setPagePost(data)
    }
    useEffect(() => {
        RecentlyData()
    }, [postCountStart])
    return (
        <section>
            <div className='flex gap-5 sm:py-20 py-10'>
                <div className='md:w-[60%] w-full'>
                    <h1 className='my-5'><span className='text-dark-cyan text-xl font-semibold p-2 '>Recently</span> Posted</h1>
                    {
                        pagePost.length !== 0 ?
                            <div className="flex flex-wrap gap-5 justify-center items-center">
                                {
                                    pagePost.map(e => <div key={e} className="flex flex-col lg:gap-5 sm:gap-2 gap-1 sm:p-5 p-2 w-80">
                                        <div>
                                            <Image src={e.thumbnail} sizes="(max-width: 768px) 100vw, 33vw" width={350} height={250} alt="" />
                                        </div>
                                        <div className="flex flex-col justify-center gap-2 text-[#777]">
                                            <p><span className="bg-cool-mint">{e.tags[0]}</span></p>
                                            <Link href={`/post-details/${e._id}`} className="font-semibold lg:text-2xl sm:text-xl text-sm text-black hover:text-dark-cyan">{e.title.length < 50 ? e.title : e.title.slice(0, 50) + '....'}</Link>
                                            <div className='flex flex-wrap gap-2 items-center'>
                                                <div className="flex gap-2 items-center justify-center">
                                                    <Image width={20} height={20} className='rounded-full' src={e?.author?.image} alt="" />
                                                    <p className='text-sm'>{e?.author?.name}</p>
                                                </div>

                                                <div className=" flex items-center justify-center"><div className="w-[1px] h-3 bg-davy-gray"></div></div>

                                                <div className="flex gap-2 items-center justify-center">
                                                    <SlCalender />
                                                    <p className='text-sm'>{e.createdAt.slice(0, 10)}</p>
                                                </div>
                                                <div className="flex gap-2 items-center justify-center">
                                                    {
                                                        e.likes.includes(user?._id) ?
                                                            <button className='cursor-pointer' onClick={() => handleLikes(e._id, RecentlyData)}><FcLike /></button>
                                                            :
                                                            <button className='cursor-pointer' onClick={() => handleLikes(e._id, RecentlyData)}><FcLikePlaceholder /></button>
                                                    }
                                                    {
                                                        e.dislikes.includes(user?._id) ?
                                                            <button className='cursor-pointer text-red-600' onClick={() => handleDislikes(e._id, RecentlyData)}><RiDislikeFill /></button>
                                                            :
                                                            <button className='cursor-pointer' onClick={() => handleDislikes(e._id, RecentlyData)}><RiDislikeLine /></button>
                                                    }
                                                    {
                                                        e.bookmark.includes(user?._id) ?
                                                            <button className='cursor-pointer text-dark-cyan' onClick={() => handleBookmark(e._id, RecentlyData)}><BsFillBookmarkHeartFill /></button>
                                                            :
                                                            <button className='cursor-pointer' onClick={() => handleBookmark(e._id, RecentlyData)}><BsFillBookmarkHeartFill /></button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                        </div>
                                    </div>)
                                }
                            </div>
                            :
                            <h1 className='text-3xl font-semibold text-dark-cyan flex justify-center items-center'>No Post Avabile</h1>
                    }
                </div>
                <div className="md:flex flex-col hidden w-[40%] gap-5">
                    <TopAuthors />
                    {/* ads  */}
                    <Ads />
                    {/* Categories  */}
                    <Categories />
                    {/* Today’s update */}
                    <TodaysUpdate />
                    {/* search with tags*/}
                    <SearchTags />
                </div>
            </div>
            {/* pagtination */}
            <div className="coustom-pagination pb-10">
                <PaginatedItems itemsPerPage={10} setPostCountStart={setPostCountStart} setPostCountEnd={setPostCountEnd} />
            </div>
        </section>
    );
}

export default Recently;