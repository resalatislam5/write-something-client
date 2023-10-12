'use client'
import { useContext, useEffect } from "react";
import AuthContext from "@/contexts/authContext";
import DashboardContext from "@/contexts/dashboardContext";
import Link from "next/link";
import Image from "next/image";

function Profile() {
    const { user, cookies } = useContext(AuthContext)
    const { UserProfileInfo } = useContext(DashboardContext)
    const { image,title,bio,links} = UserProfileInfo
    console.log(UserProfileInfo);
    return (
        <div className="sm:w-96 w-full p-5  shadow-2xl flex justify-center py-10">
          <div className="text-lg flex flex-col gap-3 font-bold">
          <Image width={200} height={200} style={{ borderRadius: '100%' }} src={image} alt="" />
                <p>Name : <span className="font-medium">{user?.name}</span></p>
            <p>Title : <span className="font-medium">{title? title : 'title are not provied'}</span></p>
                <p>bio : <span className="font-medium">{bio ? bio : 'bio are not provied'}</span></p>
            <p>website : <a href={links?.website} className="font-medium">{links?.website? links?.website : 'Links are not provied'}</a></p>
            <p>facebook : <a href={links?.facebook} className="font-medium">{links?.website ? links?.facebook : 'Links are not provied'}</a></p>
            <p>twiter : <a href={links?.twiter} className="font-medium">{links?.website ? links?.twiter : 'Links are not provied'}</a></p>
            <p>github : <a href={links?.github} className="font-medium">{links?.website ? links?.github : 'Links are not provied'}</a></p>
            <Link href='/dashboard/edit-profile' className="bg-dark-cyan py-2 text-lg text-center text-white rounded-none"  >Edit Profile</Link>
          </div>
        </div>
    );
}

export default Profile;