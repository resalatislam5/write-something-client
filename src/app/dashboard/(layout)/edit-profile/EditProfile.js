'use client'
import Image from "next/image";
import { useForm } from "react-hook-form";
import profile from '../../../ass/images.png'
import { useContext, useState } from "react";
import AuthContext from "@/contexts/authContext";
import { CgWebsite } from "react-icons/cg";
import { FaFacebookSquare, FaGithubSquare } from "react-icons/fa";
import { AiFillTwitterSquare } from "react-icons/ai";
import toast from "react-hot-toast";
import DashboardContext from "@/contexts/dashboardContext";
import Loading from "@/app/components/Loading";
import { useRouter } from "next/navigation";
function EditProfile() {
    const [userImage, setUserImage] = useState()
    const { user, cookies, lodding, setButtonLodding, buttonLodding } = useContext(AuthContext)
    const { replace } = useRouter()
    const { UserProfileInfo } = useContext(DashboardContext)
    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            image: UserProfileInfo?.image || profile,
            name: user?.name || '',
            title: UserProfileInfo?.title || '',
            bio: UserProfileInfo?.bio || '',
            website: UserProfileInfo?.links?.website || '',
            facebook: UserProfileInfo?.links?.facebook || '',
            twiter: UserProfileInfo?.links?.twiter || '',
            github: UserProfileInfo?.links?.github || '',
        },
    })
    if (lodding) {
        return
    }
    const createProfile = async (value) => {
        setButtonLodding(true)
        try {
            let res = await fetch('https://write-something-server.vercel.app/dashboard/edit-profile', {
                method: 'PUT',
                body: JSON.stringify(value),
                headers: {
                    'authorizantion': `Bearer ${cookies.cookie?.tokan}`,
                    'Content-type': 'application/json'
                }
            })
            const data = await res.json()
            if (data) {
                setButtonLodding(false)
            }
            if (data.message) {
                toast.success(data.message)
                replace('/dashboard/profile')
            }
            if (data.error) {
                data.error?.name &&
                    toast.error(data.error?.name)
                data.error?.title &&
                    toast.error(data.error?.title)
                data.error?.bio &&
                    toast.error(data.error?.bio)
                data.error?.website &&
                    toast.error(data.error?.website)
                data.error?.facebook &&
                    toast.error(data.error?.facebook)
                data.error?.twiter &&
                    toast.error(data.error?.twiter)
                data.error?.github &&
                    toast.error(data.error?.github)
            }
        } catch (e) {
            toast.error('Somethings error');
        }
    }
    const onSubmit = async (pro) => {
        setButtonLodding(true)
        let { image, name, title, bio, website, facebook, twiter, github } = pro
        if (image[0].name) {
            setUserImage(image[0]);
        }
        if (image[0].name) {
            const data = new FormData()
            data.append('image', image[0])
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.YOUR_CLIENT_API_KEY}`, {
                method: 'POST',
                body: data
            })
            const imageData = await res.json()
            if (imageData.error) {
                toast.error(imageData.error.message)
            }
            if (imageData.success) {
                image = imageData.data.url
            }
        }
        const proInfo = {
            image,
            name,
            title,
            bio,
            website,
            facebook,
            twiter,
            github
        };
        createProfile(proInfo)
    }
    const ImageChange = () => {
        const watchImage = watch('image')
        if (watchImage[0].name) {
            setUserImage(watchImage[0])
        }
    }
    return (
        <div>
            <h3 className="sm:text-4xl  text-xl font-bold py-5 roun">Create Your Profile</h3>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)} onChange={handleSubmit(ImageChange)}>
                {
                    userImage ?
                        <Image width={200} height={200} src={URL.createObjectURL(userImage)} alt="" />
                        :
                        <Image width={200} height={200} src={UserProfileInfo?.image} alt="user photo" />
                }
                <input type="file" accept="image/*" {...register('image')} />
                <div className="text-lg w-full flex flex-col gap-2">
                    <p className="font-medium">Enter Your Name:</p>
                    <input className="border-2 border-gray-300 rounded-sm px-3 py-2" type="text" placeholder="Enter your Name" {...register('name')} />
                </div>
                <div className="text-lg w-full flex flex-col gap-2">
                    <p className="font-medium">Enter Your Email:</p>
                    <input className="border-2 border-gray-300 rounded-sm px-3 py-2 font-semibold" type="text" value={user?.email} disabled />
                </div>
                <div className="text-lg w-full flex flex-col gap-2">
                    <p className="font-medium">Enter A Short Title:</p>
                    <input className="border-2 border-gray-300 rounded-sm px-3 py-2" type="text" placeholder="Enter A Short Title" {...register('title')} />
                </div>
                <div className="text-lg w-full flex flex-col gap-2">
                    <p className="font-medium">Enter A Short Bio:</p>
                    <textarea className="border-2 border-gray-300 rounded-sm px-3 py-2" cols="10" rows="3" {...register('bio')}></textarea>
                </div>
                <div className="text-lg w-full flex flex-col gap-2">
                    <p className="font-medium">Your Social Links:</p>
                    <div className="flex items-center">
                        <button className="bg-dark-cyan p-3 border-2 border-dark-cyan text-white rounded-s-sm"><CgWebsite /></button>
                        <input className="border-2 border-gray-300 rounded-sm px-3 py-2 w-full" type="text" placeholder="Website Link" {...register('website')} />
                    </div>
                    <div className="flex items-center">
                        <button className="bg-dark-cyan p-3 border-2 border-dark-cyan text-white rounded-s-sm"><FaFacebookSquare /></button>
                        <input className="border-2 border-gray-300 rounded-sm px-3 py-2 w-full" type="text" placeholder="Facebook Link" {...register('facebook')} />
                    </div>
                    <div className="flex items-center">
                        <button className="bg-dark-cyan p-3 border-2 border-dark-cyan text-white rounded-s-sm"><AiFillTwitterSquare /></button>
                        <input className="border-2 border-gray-300 rounded-sm px-3 py-2 w-full" type="text" placeholder="Twiter Link" {...register('twiter')} />
                    </div>
                    <div className="flex items-center">
                        <button className="bg-dark-cyan p-3 border-2 border-dark-cyan text-white rounded-s-sm"><FaGithubSquare /></button>
                        <input className="border-2 border-gray-300 rounded-sm px-3 py-2 w-full" type="text" placeholder="Github Link" {...register('github')} />
                    </div>
                </div>
                {
                    buttonLodding ?
                        <p className="bg-dark-cyan  py-2 text-lg rounded-none cursor-wait"><Loading /></p>
                        :
                        <input className="bg-dark-cyan cursor-pointer py-2 text-lg text-white rounded-none" type="submit" value="Update Profile" />
                }
            </form>
        </div>
    );
}

export default EditProfile;