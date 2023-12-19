'use client'
import Image from 'next/image';
import { SlCalender } from 'react-icons/sl';
import { BsFillBookmarkHeartFill, } from 'react-icons/bs';
import { FcLikePlaceholder, FcLike } from 'react-icons/fc';
import { RiDislikeLine, RiDislikeFill } from 'react-icons/ri';
import Link from 'next/link';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '@/contexts/authContext';
import Loading from '@/app/components/Loading';
function Featured() {
    const { handleLikes, handleDislikes, handleBookmark, user } = useContext(AuthContext)
    const [featured, setFeatured] = useState([])
    const [populer, setPopuler] = useState([])
    const [fetchLoading, setfetchLoading] = useState(false);

    const featuredData = async () => {
        const res = await fetch('https://write-something-server.vercel.app/home/featured')
        const data = await res.json()
        setFeatured(data)
    }
    const populerData = async () => {
        setfetchLoading(true)
        const res = await fetch(`https://write-something-server.vercel.app/home/populer`)
        const data = await res.json()
        setPopuler(data)
        setfetchLoading(false)
    }
    useEffect(() => {
        featuredData()
        populerData()
    }, [])
    return (
        <div className='flex gap-5'>
            <div className='md:w-[60%] w-full'>
                <h1 className='my-5'><span className='text-dark-cyan text-xl font-semibold p-2 '>Featured</span> This month</h1>
                <div className="flex flex-wrap gap-5 justify-center items-center">
                    {featured.length !== 0 ?
                        featured.map(e => <div key={e._id} className="grid sm:grid-cols-5 lg:gap-5 sm:gap-2 gap-1 sm:p-5 p-2 lg:w-[800px] md:w-[400px] sm:w-full w-80">
                            <div className="col-span-2 flex items-center">
                                <Image  src={e.thumbnail} width={300} height={250} alt="" />
                            </div>
                            <div className="col-span-3 flex flex-col justify-center gap-2 text-[hsl(0,0%,47%)]">
                                <p><span className="bg-cool-mint px-1">{e.tags[0]}</span></p>
                                <Link href={`/post-details/${e._id}`} className="font-semibold lg:text-2xl sm:text-lg text-sm text-black hover:text-dark-cyan">{e.title.length < 50 ? e.title : e.title.slice(0, 50) + '....'}</Link>
                                <div className='flex flex-wrap gap-2 items-center'>
                                    <div className="flex gap-2 items-center justify-center">
                                        <Image width={20} height={20} className='rounded-full' src={e?.author?.image} alt="" />
                                        <p className='text-sm'>{e?.author?.name}</p>
                                    </div>

                                    <div className=" flex items-center justify-center"><div className="w-[1px] h-3 bg-davy-gray"></div></div>

                                    <div className="flex gap-2 items-center justify-center">
                                        <SlCalender />
                                        <p className='sm:text-sm text-[12px]'>{e.createdAt.slice(0, 10)}</p>
                                    </div>
                                    <div className=" flex items-center justify-center"><div className="w-[1px] h-3 bg-davy-gray"></div></div>
                                    <div className="flex gap-2 items-center justify-center">
                                        {
                                            e.likes.includes(user?._id) ?
                                                <button className='cursor-pointer' onClick={() => handleLikes(e._id, featuredData)}><FcLike /></button>
                                                :
                                                <button className='cursor-pointer' onClick={() => handleLikes(e._id, featuredData)}><FcLikePlaceholder /></button>
                                        }
                                        {
                                            e.dislikes.includes(user?._id) ?
                                                <button className='cursor-pointer text-red-600' onClick={() => handleDislikes(e._id, featuredData)}><RiDislikeFill /></button>
                                                :
                                                <button className='cursor-pointer' onClick={() => handleDislikes(e._id, featuredData)}><RiDislikeLine /></button>
                                        }
                                        {
                                            e.bookmark.includes(user?._id) ?
                                                <button className='cursor-pointer text-dark-cyan' onClick={() => handleBookmark(e._id, featuredData)}><BsFillBookmarkHeartFill /></button>
                                                :
                                                <button className='cursor-pointer' onClick={() => handleBookmark(e._id, featuredData)}><BsFillBookmarkHeartFill /></button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>)
                        :
                        <h1 className='text-3xl font-semibold text-dark-cyan'>No Post Avabile</h1>
                    }
                </div>
            </div>
            <div className='w-[3px] md:flex hidden bg-davy-gray h-auto'>
                <div className="w-[50px] h-1/2 bg-dark-cyan"></div>
            </div>
            <div className="md:flex flex-col hidden w-[40%]">
                <h1 className='my-5'><span className='text-dark-cyan text-xl font-semibold p-2 '>Populer</span> Posted</h1>
                {!fetchLoading ?
                    <div className="flex flex-col gap-5">
                        {populer.length !== 0 ?
                            populer.map(e => <div key={e._id} className="grid grid-cols-5 lg:gap-5 gap-3 lg:p-2">
                                <div className="col-span-2 flex items-center">
                                    <Image width={200} height={120} src={e.thumbnail} alt="" />
                                </div>
                                <div className="col-span-3 flex flex-col justify-center lg:gap-2 gap-1 text-[#777]">
                                    <p><span className="bg-cool-mint px-1 text-sm lg:text-lg">{e.tags[0]}</span></p>
                                    <Link href={`/post-details/${e._id}`} className="font-semibold lg:text-lg  text-sm text-black hover:text-dark-cyan">{e.title.length < 40 ? e.title : e.title.slice(0, 40) + '....'}</Link>
                                    <div className='flex flex-wrap lg:gap-2 gap-1 items-center'>
                                        <div className="flex lg:gap-2 gap-1 items-center justify-center">
                                            <Image width={20} height={20}  className='rounded-full' src={e?.author?.image} alt="" />
                                            <p className='text-sm'>{e?.author?.name}</p>
                                        </div>

                                        <div className=" flex items-center justify-center"><div className="w-[1px] h-3 bg-davy-gray"></div></div>

                                        <div className="flex lg:gap-2 gap-1 items-center justify-center">
                                            <SlCalender />
                                            <p className='lg:text-sm text-[12px]'>{e.createdAt.slice(0, 10)}</p>
                                        </div>

                                    </div>
                                </div>
                            </div>)
                            :
                            <h1 className='text-3xl font-semibold text-dark-cyan'>No Post Avabile</h1>
                        }
                    </div>
                    :
                    <Loading />
                }
            </div>
        </div>
    );
}

export default Featured;