"use client"

import AuthContext from "@/contexts/authContext";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";


function SignUpFrom() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm()
    const [showPassword, setShowPassword] = useState(true)
    const [showPasswordIconP, setShowPasswordIconP] = useState(false)
    const [showPasswordIconC, setShowPasswordIconC] = useState(false)
    const { handleSignUp, buttonLodding } = useContext(AuthContext)
    const from = "/auth/login";
    const onSubmit = data =>{
        const {name, email, password, confirm} = data;
        const user = {
            name,
            email,
            password,
            confirm
        }
        handleSignUp(user, from)
    }
    return (
        <div >
            <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col ${Object.keys(errors).length !== 0 ? 'gap-2' : 'gap-3'}`}>
                <input className="px-5 py-3 rounded-md bg-[#224957] text-white" type="text" name="name" placeholder="Enter your name" {...register('name', {maxLength
                    : { value: 30, message: 'Name can\'t be more then 30' }, pattern: { value: /^[A-Za-z-.\s]+$/, message: 'Please enter your valid name'}})} required />
                    <p className="text-sm text-red-600 font-bold">{errors?.name?.message}</p>
                <input className="px-5 py-3 rounded-md bg-[#224957] text-white" type="email" name="email" id="" placeholder="Enter your email" {...register('email')} required/>
                <p className="text-sm text-red-600 font-bold">{errors?.email?.message}</p>
                <div className="w-full flex items-center bg-[#224957] rounded-md">
                    <input onFocusCapture={() =>setShowPasswordIconP(true)} onBlurCapture={() =>setShowPasswordIconP(false)} className={`px-5 py-3 ${showPasswordIconP? "w-full" : "w-[90%]"} rounded-md bg-[#224957] text-white`} type={ showPassword ?"password" : "text"} name="password" placeholder="Enter your password" {...register('password', {
                    minLength: { value: 8, message: 'Password will be more than 8 character' }})} required />
                    { !showPasswordIconP &&
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
                <div className="w-full flex items-center bg-[#224957] rounded-md">
                    <input onFocusCapture={() =>setShowPasswordIconC(true)} onBlurCapture={() =>setShowPasswordIconC(false)} className={`px-5 py-3  ${showPasswordIconC? "w-full" : "w-[90%]"} rounded-md bg-[#224957] text-white`} type={ showPassword ?"password" : "text"} name="confrim" placeholder="Enter your confirm password" {...register('confirm', {
                    minLength: { value: 8, message: 'Password will be more than 8 character' }, validate: data => { 
                        if(data !== watch('password')){
                            return 'Password doesn\'t match'
                        }
                    }})} required />
                    { !showPasswordIconC &&
                    <>
                        {   showPassword ?
                            <FaRegEye onClick={() => setShowPassword(!showPassword)} />
                            :
                            <FaRegEyeSlash onClick={() => setShowPassword(!showPassword)} />
                        }
                    </>
                     }
                </div>
                <p className="text-sm text-red-600 font-bold">{errors?.confirm?.message}</p>
                {buttonLodding ?
                    <input className="px-5 py-3 cursor-pointer opacity-25 rounded-md bg-[#20DF7F] text-white" type="submit" value="Sign Up" disabled/>
                    :
                    <input className="px-5 py-3 cursor-pointer rounded-md bg-[#20DF7F] text-white" type="submit" value="Sign Up" />
                }
            </form>
        </div>
    );
}

export default SignUpFrom;