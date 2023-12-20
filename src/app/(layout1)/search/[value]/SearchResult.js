'use client'
import Loading from "@/app/components/Loading";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { SlCalender } from "react-icons/sl";

function SearchResult({value}) {
    const [fetchLoading, setfetchLoading] = useState(false);
    const [search, setSearch] = useState([])
    console.log(value);
    const handleSearch = async () =>{
        setfetchLoading(true)
        const res = await fetch(`https://write-something-server.vercel.app/search?term=${value}`)
        const data = await res.json()
        setSearch(data)
        if(data){
            setfetchLoading(false)
        }
        if(data.error){
            toast.error(data.error)
            setSearch([])
        }
    }
    useEffect(() =>{
        handleSearch()
    }, [])
    console.log(search, value);
    return (
        <div className="flex flex-col  sm:px-20 px-5">
            <h1 className='my-5 text-lg text-erie-black'><span className='text-davy-gray font-semibold p-2 '>Search Result for </span> {value.length < 40 ? value.replace(/%20/g, " ") : value.replace("%20", " ").slice(0, 40) + '....'}</h1>
            <div className='sm:w-[80%] w-[90%] flex bg-davy-gray h-[1px]'>
                <div className="w-[30%] h-[4px] bg-dark-cyan"></div>
            </div>
                {!fetchLoading ?
                <div className="flex flex-col items-center sm:gap-5 gap-10 sm:w-[600px] py-10">
                    {search.length !== 0 ?
                        search.map(e => <div key={e._id} className="grid sm:grid-cols-5 lg:gap-5 gap-3 lg:p-2 w-72 sm:w-full">
                            <div className="sm:col-span-2 flex items-center">
                                <Image width={200} height={120} src={e.thumbnail} alt="" />
                            </div>
                            <div className="sm:col-span-3 flex flex-col justify-center lg:gap-2 gap-1 text-[#777]">
                                <p><span className="bg-cool-mint px-1 text-sm lg:text-lg">{e.tags[0]}</span></p>
                                <Link href={`/post-details/${e._id}`} className="font-semibold lg:text-lg  text-sm text-black hover:text-dark-cyan">{e.title.length < 40 ? e.title : e.title.slice(0, 40) + '....'}</Link>
                                <div className='flex flex-wrap lg:gap-2 gap-1 items-center'>
                                    <div className="flex lg:gap-2 gap-1 items-center justify-center">
                                        <Image width={20} height={20} className='rounded-full' src={e?.author?.image} alt="" />
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
                        <h1 className='text-3xl font-semibold text-dark-cyan'>No Result Found</h1>
                    }
                </div>
                    :
                <div className="h-[40vh] flex items-center justify-center">
                    <Loading />
                </div>
                }
        </div>
    );
}

export default SearchResult;