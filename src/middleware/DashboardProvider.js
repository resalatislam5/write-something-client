'use client'

import { useContext, useEffect, useState } from "react";
import DashboardMiddleware from "./DashboardMiddleware";
import AuthContext from "@/contexts/authContext";
function DashboardProvider({ children }) {
    const { cookies } = useContext(AuthContext);
    const [UserProfileInfo, setUserProfileInfo] = useState('')
    const profileInfo = async () => {
        let res = await fetch('https://write-something-server.vercel.app/dashboard/profile', {
            method: 'GET',
            headers: {
                'authorizantion': `Bearer ${cookies.cookie?.tokan}`,
                'Content-type': 'application/json'
            }
        })
        const data = await res.json()
        setUserProfileInfo(data)
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