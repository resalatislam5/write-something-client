'use client'
import Link from "next/link";
import { useState } from "react";
import { AiOutlineSearch } from 'react-icons/ai';
import { TfiWrite } from 'react-icons/tfi';
import { ImCross } from 'react-icons/im';
import { RxDropdownMenu } from 'react-icons/rx';
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
    }
]
function Header() {
    const [searchToggole, setSearchToggle] = useState(false);
    const [sidebar, setSidebar] = useState(false);
    return (
        <nav>
            {   sidebar?
                <div className="sidenav ">
                    <button className="ml-[75%] text-white" onClick={() => setSidebar(!sidebar)}><ImCross /></button>
                    {
                        navLinks.map(n => <Link className="hover:text-dark-cyan" href={n.path}>{n.name}</Link>,)
                    }
                    <Link className="hover:text-dark-cyan bg-red-500" href='/login'>Login</Link>
                </div>
            :
            <></>
            }
            <div className="flex justify-between lg:px-20 md:px-10 sm:px-5 px-2 bg-cool-mint py-10 items-center text-erie-black text-lg">
                <div className="">
                    <p className="sm:text-lg text-sm font-semibold"><span className="bg-dark-cyan text-white sm:text-xl text-lg px-2">Write</span> Something</p>
                </div>
                <div>
                    {
                        !searchToggole ?
                            <div className="md:flex hidden gap-5">
                                {
                                    navLinks.map(n => <Link className="hover:text-dark-cyan" href={n.path}>{n.name}</Link>,)
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
                                <div className="flex items-center gap-5 slide-left absolute sm:right-full -ml-16 sm:-ml-0">
                                    <input className="px-5 w-44 sm:w-56 lg:w-96 py-2 border border-blue-950 rounded-sm" type="text" />
                                    <button onClick={() => setSearchToggle(!searchToggole)}><ImCross /></button>
                                </div>
                                :
                                <button onClick={() => setSearchToggle(!searchToggole)}><AiOutlineSearch /></button>
                        }
                    </div>
                    <TfiWrite />
                        <Link className="lg:flex hover:text-dark-cyan hidden" href='/login'>Login</Link>
                        <Link className="hover:text-dark-cyan bg-[#FF4F00] text-white sm:px-5 px-2 py-2 rounded-lg text-sm sm:text-lg" href='/signup'>Sign up</Link>
                    <div className="flex md:hidden">
                        <button className="text-xl" onClick={() => setSidebar(!sidebar)}> <RxDropdownMenu /></button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;