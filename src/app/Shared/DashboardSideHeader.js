'use client'
import Image from 'next/image';
import image from '../ass/icon.jpeg'
import Link from 'next/link';
import { MdSpaceDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";
import { TfiWrite } from "react-icons/tfi";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { useContext } from 'react';
import AuthContext from '@/contexts/authContext';

function DashboardSideHeader() {
    const { logOut } = useContext(AuthContext)
    return (
        <nav className="lg:w-80 sm:w-52 w-20 flex flex-col bg-dark-cyan h-[100vh] fixed py-5 gap-20">
            <div className='flex justify-center'>
                <Image className='rounded-full sm:w-40 w-10' src={image} alt="User" />
            </div>
            <div className="sm:px-10 p-5 text-lg flex flex-col gap-4">
                <Link href='/' className="text-gray-300 hover:text-white flex items-center gap-2"><AiFillHome className='text-3xl' /> <span className='sm:flex hidden'>Home</span></Link>
                <Link href='/dashboard' className="text-gray-300 hover:text-white flex items-center gap-2"><MdSpaceDashboard className='text-3xl' /> <span className='sm:flex hidden'>Dashboard</span></Link>
                <Link href='/dashboard/profile' className="text-gray-300 hover:text-white flex items-center gap-2"><CgProfile className='text-3xl' /> <span className='sm:flex hidden'>Profile</span></Link>
                <Link href='/dashboard/post' className="text-gray-300 hover:text-white flex items-center gap-2"><BsFillFileEarmarkPostFill className='text-3xl' /> <span className='sm:flex hidden'>Post</span></Link>
                <Link href='/dashboard/create-post' className="text-gray-300 hover:text-white flex items-center gap-2"><TfiWrite className='text-3xl' /> <span className='sm:flex hidden'>Create Post</span></Link>
                <div className='absolute bottom-5 text-lg'>
                    <button onClick={() => logOut()} className='flex  text-gray-300 hover:text-white items-center gap-2'><IoMdLogOut className='text-3xl' /> <span className='sm:flex hidden'>Logout</span></button>
                </div>
            </div>
        </nav>
    );
}

export default DashboardSideHeader;