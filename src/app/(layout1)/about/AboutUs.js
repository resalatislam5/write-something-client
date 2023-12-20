import Image from 'next/image';
import grammarly from '@/app/ass/grammarly.png'
import unsplash from '@/app/ass/unsplash.png'
import wordpress from '@/app/ass/wordpress.png'
import medium from '@/app/ass/medium.png'
import blogger from '@/app/ass/blogger.png'
import { TfiWrite } from 'react-icons/tfi';
function AboutUs() {
    return (
        <section className="lg:py-20 py-10 px-5 ">
            <div className="lg:w-[700px] lg:px-0 md:px-32 sm:px-20 mx-auto text-erie-black flex flex-col gap-5 text-center">
                <h1 className="font-semibold sm:text-3xl text-2xl"><span className="text-dark-cyan">Notebook is a place </span> where you can find your perfect blogs</h1>
                <p className="text-davy-gray text-lg">Dynamically underwhelm integrated outsourcing via timely models. Rapidiously reconceptualize visionary imperatives without 24/365 catalysts for change. Completely streamline functionalized models and out-of-the-box functionalities. Authoritatively target proactive vortals vis-a-vis exceptional results. Compellingly brand emerging sources and compelling materials. Globally iterate parallel content</p>
                <h2 className="text-xl font-semibold">The best ideas can change who we are.</h2>
                <p className="text-davy-gray text-lg">Dynamically underwhelm integrated outsourcing via timely models. Rapidiously reconceptualize visionary imperatives without 24/365 catalysts for</p>
            </div>
            <div className="text-center py-10">
                <h1 className="font-semibold sm:text-3xl text-2xl pb-7"><span className="text-dark-cyan">We Are </span> Featured On</h1>
                <div className="flex gap-10 flex-wrap justify-center">
                    <Image src={grammarly} alt="" />
                    <Image src={unsplash} alt="" />
                    <Image src={wordpress} alt="" />
                    <Image src={medium} alt="" />
                    <Image src={blogger} alt="" />
                </div>
            </div>
            <div className='text-center flex flex-col gap-5 pt-10 items-center'>
                <h2 className="sm:text-3xl text-xl font-semibold">Want To Write On Notebook?</h2>
                <p className="text-davy-gray text-lg">There have some simple steps, by following these steps you can be a regular author in notebook</p>
                <a className='boreder border-2 border-dark-cyan text-dark-cyan w-48  h-14 flex gap-3 items-center justify-center' href="/dashboard/create-post"><TfiWrite />Write On Notebook</a>
            </div>
        </section>
    );
}

export default AboutUs;