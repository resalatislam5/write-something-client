import Link from "next/link";
import SignUpFrom from "./SignUpFrom";

function SignUpPage() { 
    return (
        <main className="bg-[#093545] px-3 sm:px-0">
            <div className="h-[100vh]  flex items-center justify-center sign-bp-bg">
                <div className="text-white flex flex-col sm:gap-10 gap-5">
                    <h1 className="sm:text-7xl text-4xl text-center">Sign Up</h1>
                    <p className="text-sm sm:text-lg">Sign up and start managing your candidates!</p>
                    <SignUpFrom />
                    <p>Already have an account ? <Link className="text-dark-cyan font-bold" href="/auth/login">Login</Link></p>
                </div>
            </div>
       </main>
    );
}

export default SignUpPage;