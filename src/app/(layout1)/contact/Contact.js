'use client'
import CopyToClipboard from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import { AiFillTwitterSquare } from "react-icons/ai";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";

function Contact() {
    return (
        <div className="lg:py-20 pt-10 sm:px-5 px-3">
            <h1 className="font-semibold sm:text-3xl text-2xl text-center"><span className="text-dark-cyan">Contact </span>  Us</h1>
            <div className="grid md:grid-cols-5 gap-8 justify-items-center max-w-6xl mx-auto lg:pt-20 pt-10">
                <div className="col-span-3">
                    <form className="flex flex-col gap-5">
                        <div className="flex flex-col sm:flex-row gap-5">
                            <input className="border border-dark-cyan px-5 py-2 sm:w-[40%]" type="text"  placeholder="Name"/>
                            <input className="border border-dark-cyan px-5 py-2 sm:w-[40%]" type="email" placeholder="Email" />
                        </div>
                        <input className="border border-dark-cyan px-5 py-2 sm:w-[83%]" type="text" placeholder="Subject" />
                        <textarea className="border border-dark-cyan px-5 py-2 sm:w-[83%]" name="" id="" cols="30" rows="10" placeholder="Type your message"></textarea>
                        <input className="px-5 cursor-pointer py-2 sm:w-[20%] bg-dark-cyan text-white" type="submit" value="Submit" />
                    </form>
                </div>
                <div className="col-span-2 flex flex-col justify-start items-start sm:gap-8 gap-5">
                    <p className="text-davy-gray text-lg">Dynamically underwhelm integrated outsourcing via timely models. Rapidiously reconceptualize visionary imperatives without</p>
                    <div className="text-davy-gray text-lg flex flex-col items-start gap-3">
                        <CopyToClipboard text="resalatislam5@gmail.com">
                            <button onClick={() => toast.success('Copy success')}>resalatislam5@gmail.com</button>
                        </CopyToClipboard>
                        <CopyToClipboard text="+8801765975545">
                            <button onClick={() => toast.success('Copy success')}>+8801765975545</button>
                        </CopyToClipboard>
                        <CopyToClipboard text="Gaibandha, Dhaka, Bangladesh">
                            <button onClick={() => toast.success('Copy success')}>Gaibandha, Dhaka, Bangladesh</button>
                        </CopyToClipboard>
                    </div>
                    <div>
                        <h3 className="text-lg text-erie-black">Follow on:</h3>
                        <div className='flex gap-3 justify-center py-5'>
                            <a href="https://www.facebook.com/resalat.islam.18" className='text-[#999] hover:text-dark-cyan text-2xl' target="_blank"><FaFacebookSquare /></a>
                            <a href="https://twitter.com/resalatislam5" className='text-[#999] hover:text-dark-cyan text-2xl' target="_blank"><AiFillTwitterSquare /></a>
                            <a href="https://www.linkedin.com/in/resalat-islam/" target="_blank" className='text-[#999] hover:text-dark-cyan text-2xl'><FaLinkedin /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;