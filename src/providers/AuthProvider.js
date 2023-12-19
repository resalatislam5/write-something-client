import AuthContext from "@/contexts/authContext";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from "react";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [cookies, setCookie, removeCookie] = useCookies(['cookie']);
    const [lodding, setLodding] = useState(true)
    const [buttonLodding, setButtonLodding] = useState(false)

    const { replace } = useRouter();
    const pathname = usePathname()

    //signUp
    const handleSignUp = async (user, from) => {
        setButtonLodding(true)
        const res = await fetch('https://write-something-server.vercel.app/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        const data = await res.json();
        if (data) {
            setButtonLodding(false)
        }
        if (data?.email) {
            toast.error(data?.email || 'The user creates unsuccessfully')
        }
        if (data?.message) {
            toast.success(data?.message)
            const tokan = data?.tokan
            setCookie('cookie', { tokan, user: data.user }, { path: '/' }, { maxAge: 60 * 60 * 24 * 15 })
            setUser(data.user)
            replace(from)
        }
    }
    //login
    const handleLogin = async (user, from) => {
        setButtonLodding(true)
        const res = await fetch('https://write-something-server.vercel.app/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        const data = await res.json();
        if (data) {
            setButtonLodding(false)
        }


        if (data?.message) {
            toast.error(data?.message)
        }
        if (data?.user) {
            toast.success('User login Successfully')
            const tokan = data?.tokan
            setCookie('cookie', { tokan, user: data.user }, { path: '/' }, { maxAge: 60 * 60 * 24 * 15 })
            setUser(data.user)
            replace(from)
        }
    }
    //logOut
    const logOut = () => {
        removeCookie('cookie', { path: '/' })
        setUser(null)
    }
    //private routes
    useEffect(() => {
        if (!cookies.cookie) {
            if (pathname === '/dashboard' || pathname === '/dashboard/profile' || pathname === '/dashboard/post' || pathname === '/dashboard/create-post'
                || pathname === '/dashboard/edit-profile' || pathname === '/dashboard/edit-post'
            ) {
                if (!cookies.cookie && !user) {
                    replace('/auth/login')
                }
            }
            if (user) {
                setLodding(false)
            }
            return
        }
        if (cookies.cookie) {
            setUser(cookies.cookie?.user)
            setLodding(false)
            if (pathname === '/auth/login') {
                replace('/')
            }
            if (pathname === '/auth/signup') {
                replace('/')
            }
        }
    },)
    //likes handaler
    const handleLikes = async (id, featuredData) => {
        const res = await fetch(`https://write-something-server.vercel.app/post/likes/${id}`, {
            method: 'POST',
            headers: {
                'authorizantion': `Bearer ${cookies.cookie?.tokan}`,
                'Content-type': 'application/json'
            }
        })
        const data = await res.json()
        if (data.message) {
            toast.success(data.message)
            featuredData()
        }
        if (data.error) {
            toast.error(data.error)
            if (!user) {
                replace("/auth/login")
            }
        }
    }
    //dislikes handaler
    const handleDislikes = async (id, featuredData) => {
        const res = await fetch(`https://write-something-server.vercel.app/post/dislikes/${id}`, {
            method: 'POST',
            headers: {
                'authorizantion': `Bearer ${cookies.cookie?.tokan}`,
                'Content-type': 'application/json'
            }
        })
        const data = await res.json()
        if (data.message) {
            toast.success(data.message)
            featuredData()
        }
        if (data.error) {
            toast.error(data.error)
            if (!user) {
                replace("/auth/login")
            }
        }
    }
    //handleBookmark handaler
    const handleBookmark = async (id, featuredData) => {
        // setButtonLodding(true)
        const res = await fetch(`https://write-something-server.vercel.app/post/bookmarks/${id}`, {
            method: 'POST',
            headers: {
                'authorizantion': `Bearer ${cookies.cookie?.tokan}`,
                'Content-type': 'application/json'
            }
        })
        const data = await res.json()
        if (data.message) {
            toast.success(data.message)
            featuredData()
        }
        if (data.error) {
            toast.error(data.error)
            if (!user) {
                replace("/auth/login")
            }
        }
    }
    const value = {
        handleSignUp,
        handleLogin,
        setCookie,
        cookies,
        lodding,
        user,
        logOut,
        setButtonLodding,
        buttonLodding,
        handleLikes,
        handleDislikes,
        handleBookmark,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider;