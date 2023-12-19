'use client'
import image from '@/app/ass/blogp.jpg'
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AiFillTwitterSquare } from 'react-icons/ai';
import { FaFacebookSquare, FaGithubSquare } from 'react-icons/fa';
import Loading from './Loading';
function TopAuthors() {
    const [topAuthor, setTopAuthor] = useState([])
    const [fetchLoading, setfetchLoading] = useState(false);
    const topAuthorFetch = async () => {
        setfetchLoading(true)
        const res = await fetch(`https://write-something-server.vercel.app/home/author`)
        const data = await res.json()
        setTopAuthor(data)
        setfetchLoading(false)
    }
    useEffect(() => {
        topAuthorFetch()
    }, [])
    if (fetchLoading) {
        return <Loading />
    }
    return (
        <div>
            <h1 className='my-5'><span className='text-dark-cyan text-xl font-semibold p-2 '>Top</span> Authors</h1>
            <div className="flex flex-col gap-5">
                {
                    topAuthor.map(e => <div key={e} className="flex gap-5 ">
                        <Image className='rounded-full' width={129} height={115} src={e.image} alt="" />
                        <div className="flex flex-col justify-center lg:gap-2 gap-1 text-[#777]">
                            <h1 className="font-semibold lg:text-lg text-sm text-black">{e.user?.name}</h1>
                            <p className="text-sm text-davy-gray">{e.title}</p>
                            <div className='flex gap-3'>
                                <Link className='hover:text-dark-cyan text-2xl' href=""><FaFacebookSquare /></Link>
                                <Link className='hover:text-dark-cyan text-2xl' href=""><AiFillTwitterSquare /></Link>
                                <Link className='hover:text-dark-cyan text-2xl' href=""><FaGithubSquare /></Link>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
}

export default TopAuthors;