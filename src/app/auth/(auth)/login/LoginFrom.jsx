"use client"

import AuthContext from "@/contexts/authContext";
import { useSearchParams } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const LoginFrom = ()  =>{
    const { handleLogin, buttonLodding } = useContext(AuthContext)
    const {handleSubmit, register, formState: {errors}} = useForm()
    const [showPassword, setShowPassword] = useState(true)
    const [showPasswordIcon, setShowPasswordIcon] = useState(false)
    const search = useSearchParams();
    const from = search.get("redirectUrl") || "/";
    const onSubmit = (data) => {
        const {email, password} = data
        const user = {
            email,
            password
        }
        handleLogin(user, from)
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <input className="px-5 py-3 rounded-md bg-[#224957] text-white" type="email" name="email" id="" placeholder="Enter your email"{...register('email')} required />
                    <div className="w-full flex items-center bg-[#224957] rounded-md">
                    <input onFocusCapture={() =>setShowPasswordIcon(true)} onBlurCapture={() =>setShowPasswordIcon(false)} className={`px-5 py-3 ${showPasswordIcon? "w-full" : "w-[90%]"} rounded-md bg-[#224957] text-white`} type={ showPassword ?"password" : "text"} name="password" placeholder="Enter your password" {...register('password', {minLength
                    : { value: 8, message: 'Password will be more than 8 character' }})} required />
                        { !showPasswordIcon &&
                    <>
                        {   showPassword ?
                            <FaRegEye onClick={() => setShowPassword(!showPassword)} />
                            :
                            <FaRegEyeSlash onClick={() => setShowPassword(!showPassword)} />
                        }
                    </>
                     }
                    </div>
                <p className="text-sm text-red-600 font-bold">{errors?.password?.message}</p>
               { buttonLodding ?
                    <input className="px-5 py-3 cursor-pointer opacity-25 rounded-md bg-[#20DF7F] text-white" type="submit" value="Login" disabled />
                :
                    <input className="px-5 py-3 cursor-pointer rounded-md  bg-[#20DF7F] text-white" type="submit" value="Login" />
                }
            </form>
        </div>
    );
}

export default LoginFrom;