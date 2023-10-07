"use client"

import AuthContext from "@/contexts/authContext";
import { useSearchParams } from "next/navigation";
import { useContext } from "react";
import { useForm } from "react-hook-form";


function SignUpFrom() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm()
    const { handleSignUp } = useContext(AuthContext)
    const search = useSearchParams();
    const from = search.get("redirectUrl") || "/";
   
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
                    : { value: 30, message: 'Name can\'t be more then 30' }, pattern: {value :/^[A-Za-z]+$/i, message: 'Please enter your valid name'}})} required />
                    <p className="text-sm text-red-600 font-bold">{errors?.name?.message}</p>
                <input className="px-5 py-3 rounded-md bg-[#224957] text-white" type="email" name="email" id="" placeholder="Enter your email" {...register('email')} required/>
                <p className="text-sm text-red-600 font-bold">{errors?.email?.message}</p>
                <input className="px-5 py-3 rounded-md bg-[#224957] text-white" type="password" name="password" placeholder="Enter your password" {...register('password', {
                    minLength: { value: 8, message: 'Password will be more than 8 character' }})} required />
                <p className="text-sm text-red-600 font-bold">{errors?.password?.message}</p>
                <input className="px-5 py-3 rounded-md bg-[#224957] text-white" type="password" name="confrim" placeholder="Enter your confirm password" {...register('confirm', {
                    minLength: { value: 8, message: 'Password will be more than 8 character' }, validate: data => { 
                        if(data !== watch('password')){
                            return 'Password doesn\'t match'
                        }
                    }})} required />
                <p className="text-sm text-red-600 font-bold">{errors?.confirm?.message}</p>
                <input className="px-5 py-3 rounded-md bg-[#20DF7F] text-white" type="submit" value="Sign Up" />
            </form>
        </div>
    );
}

export default SignUpFrom;