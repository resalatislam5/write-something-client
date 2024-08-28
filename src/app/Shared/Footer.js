import Link from "next/link";
import { FaFacebookSquare, FaGithubSquare } from "react-icons/fa";
import { AiFillTwitterSquare } from "react-icons/ai";
function Footer() {
    return (
        <div className="pt-20 max-w-[2550px] px-5 bg-cool-mint">
            <div className="flex flex-wrap lg:flex-nowrap gap-10 lg:gap-0 lg:justify-around justify-between">
                <div className="">
                    <h1 className="sm:text-lg text-sm font-semibold"><span className="bg-dark-cyan text-white sm:text-xl text-lg px-2">Write</span> Something</h1>
                    <p className="pt-3">Did you come here for <br /> something in particular or just <br /> general Riker</p>
                </div>
                <div className="text-davy-gray flex flex-col gap-3 ">
                    <h3 className="text-xl text-erie-black font-semibold">blogs</h3>
                    <Link className="text-lg hover:text-dark-cyan inline-flex" href="/">Travel</Link>
                    <Link className="text-lg hover:text-dark-cyan" href="/">Technology</Link>
                    <Link className="text-lg hover:text-dark-cyan" href="/">Lifestyle</Link>
                    <Link className="text-lg hover:text-dark-cyan" href="/">fashion</Link>
                    <Link className="text-lg hover:text-dark-cyan" href="/">Business</Link>
                </div>
                <div className="text-davy-gray flex flex-col gap-3 ">
                    <h3 className="text-xl text-erie-black font-semibold">Quick Links</h3>
                    <Link className="text-lg hover:text-dark-cyan" href="/">FAQ</Link>
                    <Link className="text-lg hover:text-dark-cyan" href="/">Terms & conditions</Link>
                    <Link className="text-lg hover:text-dark-cyan" href="/">support</Link>
                    <Link className="text-lg hover:text-dark-cyan" href="/">privacy policy</Link>
                </div>
                <div className="text-davy-gray flex flex-col gap-3">
                    <h3 className="text-xl text-erie-black font-semibold">Subscribe for newsletter</h3>
                    <form>
                        <input className="md:px-8 px-4 md:py-3 py-2" type="email" placeholder="Your Email" required/>
                        <input className="md:px-8 px-4 md:py-3 py-2 bg-dark-cyan text-white text-lg rounded-e-md cursor-pointer" type="submit" value="Subcribe" />
                    </form>
                    <h3 className="text-xl text-erie-black font-semibold">follow on:</h3>
                    <div className='flex gap-3'>
                        <Link className='hover:text-dark-cyan text-2xl' href=""><FaFacebookSquare /></Link>
                        <Link className='hover:text-dark-cyan text-2xl' href=""><AiFillTwitterSquare /></Link>
                        <Link className='hover:text-dark-cyan text-2xl' href=""><FaGithubSquare /></Link>
                    </div>
                </div>
            </div>
            <div>
                <div className="w-full h-[1px] bg-dark-cyan mt-8"></div>
                <p className="text-center text-davy-gray py-10">Designed By Themefisher & Developed By Gethugothemes</p>
            </div>
        </div>
    );
}

export default Footer;