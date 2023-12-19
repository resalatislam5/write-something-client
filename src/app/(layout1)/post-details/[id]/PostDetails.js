'use client'
import Ads from "@/app/components/Ads";
import Categories from "@/app/components/Categories";
import SearchTags from "@/app/components/SearchTags";
import TodaysUpdate from "@/app/components/TodaysUpdate";
import TopAuthors from "@/app/components/TopAuthors";
import Image from "next/image";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { RiDislikeFill, RiDislikeLine } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import Link from "next/link";
import { FaFacebookSquare, FaLink, FaLinkedin } from "react-icons/fa";
import { AiFillTwitterSquare } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/contexts/authContext";
import parse from 'html-react-parser';
import Comments from "@/app/components/Comments";
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from "react-share";
import CopyToClipboard from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import Loading from "@/app/components/Loading";

function PostDetails({ id }) {
    const [singlePost, setSinglePost] = useState([])
    const [populer, setPopuler] = useState([])
    const { handleLikes, handleDislikes, handleBookmark, user } = useContext(AuthContext);
    const fetchData = async () => {
        const res = await fetch(`https://write-something-server.vercel.app/post/${id}`)
        const data = await res.json()
        setSinglePost(data)
    }
    const populerData = async () => {
        const res = await fetch(`https://write-something-server.vercel.app/home/populer`)
        const data = await res.json()
        setPopuler(data)
    }
    useEffect(() => {
        fetchData()
        populerData()
    }, [])
    if (singlePost.length === 0) {
        return <Loading />
    }
    return (
        <section>
            <div className='flex gap-5 py-10 px-5'>
                <div className='md:w-[60%] w-full'>
                    <span className="bg-cool-mint px-2 text-davy-gray">{singlePost?.tags[0]}</span>
                    <h1 className="text-[#222] text-2xl font-semibold py-4">{singlePost?.title}</h1>
                    <div className='flex flex-wrap gap-2 items-center'>
                        <div className="flex gap-2 items-center justify-center">
                            <Image width={20} height={20} className='rounded-full' src={singlePost?.author?.image} alt="" />
                            <p className='text-sm'>{singlePost?.author?.name}</p>
                        </div>

                        <div className=" flex items-center justify-center"><div className="w-[1px] h-3 bg-davy-gray"></div></div>

                        <div className="flex gap-2 items-center justify-center">
                            <SlCalender />
                            <p className='text-sm'>{singlePost?.createdAt?.slice(0, 10)}</p>
                        </div>
                        <div className=" flex items-center justify-center"><div className="w-[1px] h-3 bg-davy-gray"></div></div>
                        <div className="flex gap-5 items-center justify-center">
                            {
                                singlePost.likes?.includes(user?._id) ?
                                    <div className="flex gap-1">
                                        <button className='cursor-pointer' onClick={() => handleLikes(singlePost._id, fetchData)}><FcLike /></button>
                                        <p>{singlePost.likes?.length}</p>
                                    </div>
                                    :
                                    <div className="flex gap-1">
                                        <button className='cursor-pointer' onClick={() => handleLikes(singlePost._id, fetchData)}><FcLikePlaceholder /></button>
                                        <p>{singlePost.likes?.length}</p>
                                    </div>
                            }
                            {
                                singlePost.dislikes?.includes(user?._id) ?
                                    <div className="flex gap-1">
                                        <button className='cursor-pointer text-red-600' onClick={() => handleDislikes(singlePost._id, fetchData)}><RiDislikeFill /></button>
                                        <p>{singlePost.dislikes?.length}</p>
                                    </div>
                                    :
                                    <div className="flex gap-1">
                                        <button className='cursor-pointer' onClick={() => handleDislikes(singlePost._id, fetchData)}><RiDislikeLine /></button>
                                        <p>{singlePost.dislikes?.length}</p>
                                    </div>
                            }
                            {
                                singlePost.bookmark?.includes(user?._id) ?
                                    <div className="flex gap-1">
                                        <button className='cursor-pointer text-dark-cyan' onClick={() => handleBookmark(singlePost._id, fetchData)}><BsFillBookmarkHeartFill /></button>
                                        <p>{singlePost.bookmark?.length}</p>
                                    </div>
                                    :
                                    <div className="flex gap-1">
                                        <button className='cursor-pointer' onClick={() => handleBookmark(singlePost._id, fetchData)}><BsFillBookmarkHeartFill /></button>
                                        <p>{singlePost.bookmark?.length}</p>
                                    </div>
                            }
                        </div>
                    </div>
                    <div className="py-10 flex gap-5 flex-col">
                        <Image className="w-full" width={500} height={500} src={singlePost.thumbnail} alt="" />
                        {parse(singlePost?.body)}
                    </div>
                    <div className='flex gap-3 justify-center py-10'>
                        <CopyToClipboard text={`https://www.linkedin.com/in/resalat-islam/`}>
                            <button onClick={() => toast.success('Copy success')} className='text-[#999] hover:text-dark-cyan text-2xl'><FaLink /></button>
                        </CopyToClipboard>
                        <FacebookShareButton
                            url={`https://www.linkedin.com/in/resalat-islam/`}
                        >
                            <button className='text-[#999] hover:text-dark-cyan text-2xl' ><FaFacebookSquare /></button>
                        </FacebookShareButton>
                        <TwitterShareButton
                            url={`https://www.linkedin.com/in/resalat-islam/`}
                        >
                            <button className='text-[#999] hover:text-dark-cyan text-2xl'><AiFillTwitterSquare /></button>
                        </TwitterShareButton>
                        <LinkedinShareButton
                            url={`https://www.linkedin.com/in/resalat-islam/`}
                        >
                            <button className='text-[#999] hover:text-dark-cyan text-2xl'><FaLinkedin /></button>
                        </LinkedinShareButton>
                    </div>
                    
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
            <div>
                <div className="">
                    <h1 className='my-5'><span className='font-semibold text-dark-cyan text-xl p-2 '>Recently</span> Posted</h1>
                    <div className="flex sm:flex-nowrap flex-wrap justify-center sm:justify-normal gap-5 items-center">
                        {
                            populer.slice(0, 2).map(e => <div key={e._id} className="flex flex-col lg:gap-5 sm:gap-2 gap-1 sm:p-5 p-2 sm:w-96 w-80">
                                <div >
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
                                                    <button className='cursor-pointer' onClick={() => handleLikes(e._id, populerData)}><FcLike /></button>
                                                    :
                                                    <button className='cursor-pointer' onClick={() => handleLikes(e._id, populerData)}><FcLikePlaceholder /></button>
                                            }
                                            {
                                                e.dislikes.includes(user?._id) ?
                                                    <button className='cursor-pointer text-red-600' onClick={() => handleDislikes(e._id, populerData)}><RiDislikeFill /></button>
                                                    :
                                                    <button className='cursor-pointer' onClick={() => handleDislikes(e._id, populerData)}><RiDislikeLine /></button>
                                            }
                                            {
                                                e.bookmark.includes(user?._id) ?
                                                    <button className='cursor-pointer text-dark-cyan' onClick={() => handleBookmark(e._id, populerData)}><BsFillBookmarkHeartFill /></button>
                                                    :
                                                    <button className='cursor-pointer' onClick={() => handleBookmark(e._id, populerData)}><BsFillBookmarkHeartFill /></button>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
            </div>
            <div className="lg:px-10 px-2 py-10">
                <Comments postId={id} likes={singlePost?.likes} comments={singlePost?.comments} fetchData={fetchData} />
            </div>
        </section>
    );
}

export default PostDetails