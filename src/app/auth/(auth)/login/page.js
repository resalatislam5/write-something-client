import Link from "next/link";
import LoginFrom from "./LoginFrom";

export const metadata = {
  title: "Login - Write Something",
  description: "Write Something",
};

function LoginPage() { 
    return (
      <main className="bg-[#093545] px-3 sm:px-0">
        <div className="h-[100vh]  flex items-center justify-center sign-bp-bg">
          <div className="text-white flex flex-col sm:gap-10 gap-5">
            <h1 className="sm:text-7xl text-4xl text-center">Login</h1>
            <p className="text-sm sm:text-lg">
              Login and start managing your candidates!
            </p>
            <LoginFrom />
            <p>
              {" "}
              If you haven &apos;t an account, please?{" "}
              <Link className="text-dark-cyan font-bold" href="/auth/signup">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </main>
    );
}

export default LoginPage;