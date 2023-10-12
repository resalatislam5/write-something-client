import AuthContext from "@/contexts/authContext";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from "react";

const AuthProvider = ({children}) =>{
    const [user, setUser] = useState()
    const [cookies, setCookie, removeCookie] = useCookies(['cookie']);
    const [lodding, setLodding] = useState(true)
    console.log(cookies);

    const { replace } = useRouter();
    const pathname = usePathname()

    //signUp
    const handleSignUp = async (user, from) => {
        const res = await fetch('http://localhost:5000/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        const data = await res.json();
        console.log(data);
        if (data?.email){
            toast.error(data?.email || 'The user creates unsuccessfully')
        }
        if (data?.message){
            toast.success(data?.message)
            const tokan = data?.tokan
            setCookie('cookie', { tokan, user: data.user }, { path: '/' }, {maxAge :60 * 60 * 24 * 15})
            setUser(data.user)
            replace(from)
        }
    }
        //login
    const handleLogin = async (user, from) => {
        const res = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        const data = await res.json();
        
        console.log(data);


        if(data?.message){
            toast.error(data?.message)
        }
        if (data?.user){
            toast.success('User login Successfully')
            const tokan = data?.tokan
            setCookie('cookie', {tokan, user: data.user}, { path: '/' }, { maxAge: 60 * 60 * 24 * 15 })
            setUser(data.user)
            replace(from)
        }
    }
    //logOut
    const logOut = () => {
        removeCookie('cookie', {path : '/'})
        console.log('logout');
        setUser(null)
    }
    //private routes
    useEffect(() => {
        if (!cookies.cookie) {
            console.log('user not found');
            if (pathname === '/dashboard'){
                if (!cookies.cookie && !user) {
                    replace('/auth/login')
                }
            }
            if(user){
                setLodding(false)
            }
            return
        }
        if (cookies.cookie) {
            setUser(cookies.cookie?.user)
            setLodding(false)
            if(pathname === '/auth/login'){
                replace('/')
            }
            if(pathname === '/auth/signup'){
                replace('/')
            }
        }
    },)
    const value = {
        handleSignUp,
        handleLogin,
        setCookie,
        cookies,
        lodding,
        user,
        logOut
    }

    return <AuthContext.Provider value ={value}>{children}</AuthContext.Provider>
}

export default AuthProvider;