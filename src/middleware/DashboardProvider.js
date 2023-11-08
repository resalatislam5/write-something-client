'use client'

import { useContext, useEffect, useState } from "react";
import DashboardMiddleware from "./DashboardMiddleware";
import AuthContext from "@/contexts/authContext";
function DashboardProvider({children}) {
    const { cookies } = useContext(AuthContext);
    const [UserProfileInfo, setUserProfileInfo] = useState('')
    const profileInfo = async () => {
        let res = await fetch('http://localhost:5000/dashboard/profile', {
            method: 'GET',
            headers: {
                'authorizantion': `Bearer ${cookies.cookie?.tokan}`,
                'Content-type': 'application/json'
            }
        })
        const data = await res.json()
        setUserProfileInfo(data)
        console.log('get profile', data);
    }
    useEffect(() => {
        profileInfo()
    }, [])
    return (
        <div>
            <DashboardMiddleware UserProfileInfo={UserProfileInfo}>
                {children}
            </DashboardMiddleware>
        </div>
    );
}

export default DashboardProvider;