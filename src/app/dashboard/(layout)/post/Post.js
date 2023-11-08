'use client'
import Image from "next/image";
import images from '@/app/ass/images.png'
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/contexts/authContext";
import toast from "react-hot-toast";
function Post() {
    const [userPost, setUserPost] = useState([])
    console.log(userPost);
    const { cookies, lodding } = useContext(AuthContext)
    if (lodding) {
        return
    }
    const fetchData = async () => {
            const res = await fetch('http://localhost:5000/post/user-post', {
                method: 'GET',
                headers: {
                    'authorizantion': `Bearer ${cookies.cookie?.tokan}`,
                    'Content-type': 'application/json'
                }
            })
            const data = await res.json()
            setUserPost(data)
            console.log('post',data);
    }
    const deletePost = async (id) => {
        const res = await fetch(`http://localhost:5000/post/user-post/${id}`, {
                method: 'delete',
                headers: {
                    'authorizantion': `Bearer ${cookies.cookie?.tokan}`,
                    'Content-type': 'application/json'
                }
            })
            const data = await res.json()
            if(data.message){
                toast.success(data.message)
                fetchData()
            }
            if(data.error){
                toast.error(data.error)
            }
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className="flex flex-wrap gap-5">
            {
                userPost.map( e => <div key={e._id} className="md:w-96 w-80 border p-5 relative">
                    <Image width={300} height={100} src={e.thumbnail} alt="" />
                    <h1 className="font-bold text-2xl pt-5 pb-16">{e.title.length < 40 ? e.title : e.title.slice(0, 40) + '....'}</h1>
                    <div>
                </div>
                <div className="absolute bottom-5 flex gap-5 py-2">
                    <Link className="bg-dark-cyan text-lg text-white rounded-none p-2" href={`/dashboard/edit-post/${e._id}`} >Edit Post</Link>
                    <button onClick={() => deletePost(e._id)} className="border border-dark-cyan hover:bg-red-700 hover:border-red-700 hover:text-white text-lg rounded-none py-2 md:px-4 px-2">Delete</button>
                </div>
                </div>)
            }
            
        </div>
    );
}

export default Post;