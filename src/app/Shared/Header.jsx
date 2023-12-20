'use client'
import Link from "next/link";
import { useContext, useState } from "react";
import { AiOutlineSearch } from 'react-icons/ai';
import { TfiWrite } from 'react-icons/tfi';
import { ImCross } from 'react-icons/im';
import { RxDropdownMenu } from 'react-icons/rx';
import AuthContext from "@/contexts/authContext";
const navLinks = [
    {
        path: '/',
        name: 'Home'
    },
    {
        path: '/about',
        name: 'About'
    },
    {
        path: '/contact',
        name: 'Contact'
    },
]
function Header() {
    const [searchToggole, setSearchToggle] = useState(false);
    const [sidebar, setSidebar] = useState(false);
    const [search, setSearch] = useState('')
    const { user, logOut } = useContext(AuthContext)
    return (
        <nav>
            {   sidebar?
                <div className="sidenav ">
                    <button className="ml-[75%] text-white" onClick={() => setSidebar(!sidebar)}><ImCross /></button>
                    {
                        navLinks.map((n, i) => <Link key={i} className="hover:text-dark-cyan" href={n.path}>{n.name}</Link>)
                    }
                    {
                        !user &&
                        <Link className="hover:text-dark-cyan bg-red-500" href='/auth/login'>Login</Link>
                    }
                    {
                        user &&
                        <Link className="hover:text-dark-cyan" href='/dashboard'>Dashboard</Link>
                    }
                </div>
            :
            <></>
            }
            <div className="flex justify-between lg:px-20 md:px-10 sm:px-5 px-2 bg-cool-mint py-10 items-center text-erie-black text-lg">
                <div className="">
                    <Link href={'/'} className="sm:text-lg text-sm font-semibold"><span className="text-dark-cyan font-semibold sm:text-xl text-lg px-2">Write</span> Something</Link>
                </div>
                <div>
                    {
                        !searchToggole ?
                            <div className="md:flex hidden gap-5">
                                {
                                    navLinks.map((n,i) => <Link key={i} className="hover:text-dark-cyan" href={n.path}>{n.name}</Link>,)
                                }
                                {
                                    user &&
                                    <Link className="hover:text-dark-cyan" href='/dashboard'>Dashboard</Link>
                                }
                            </div>
                            :
                            <></>
                    }
                </div>
                <div className="flex justify-center items-center sm:gap-5 gap-3">
                    <div className="relative flex items-center">
                        {
                            searchToggole ?
                                <div className="flex items-center gap-5 slide-left absolute sm:right-full -ml-24 sm:-ml-0">
                                    <div className="flex items-center border border-dark-cyan rounded-sm">
                                        <input onChange={() => setSearch(event.target.value)} className="px-5 w-40 sm:w-52 lg:w-96 py-2 " name="search" type="text" />
                                        <Link className="px-4 bg-dark-cyan text-white py-3" href={`/search/${search}`}><AiOutlineSearch /></Link>
                                    </div>
                                    <button onClick={() => setSearchToggle(!searchToggole)}><ImCross /></button>
                                </div>
                                :
                                <button  onClick={() => setSearchToggle(!searchToggole)} ><AiOutlineSearch /></button>
                        }
                    </div>
                    <Link href='/dashboard/create-post'><TfiWrite /></Link>
                        {   !user ?
                            <>
                            <Link className="md:flex hover:text-dark-cyan hidden" href='/auth/login'>Login</Link>
                            <Link className=" bg-[#FF4F00] text-white sm:px-5 px-2 py-2 rounded-lg text-sm sm:text-lg" href='/auth/signup'>Sign up</Link>
                            </>
                            :
                        <button onClick={() => logOut()} className=" bg-[#FF4F00] text-white sm:px-5 px-2 py-2 rounded-lg text-sm sm:text-lg">Logout</button>
                        }
                    <div className="flex md:hidden">
                        <button className="text-xl" onClick={() => setSidebar(!sidebar)}> <RxDropdownMenu /></button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;