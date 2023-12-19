import Image from "next/image";
import { FaFacebookF, FaReply, FaTwitter } from "react-icons/fa";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import image from '@/app/ass/images.png'
import { useContext, useState } from "react";
import AuthContext from "@/contexts/authContext";
import Loading from "./Loading";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FacebookShareButton, TwitterShareButton } from "react-share";


function Comments({ postId, likes, comments, fetchData }) {
    const [replyButton, setReplyButton] = useState('');
    const [replyId, setReplyId] = useState();
    const { handleLikes, cookies, setButtonLodding, buttonLodding, user } = useContext(AuthContext)
    const { replace } = useRouter();
    const handelComment = async (e) => {
        e.preventDefault()
        setButtonLodding(true)
        const value = e.target?.comment?.value
        try {
            let res = await fetch(`https://write-something-server.vercel.app/post/comments/${postId}`, {
                method: 'POST',
                body: JSON.stringify({ body: value }),
                headers: {
                    'authorizantion': `Bearer ${cookies.cookie?.tokan}`,
                    'Content-type': 'application/json'
                }
            })
            const data = await res.json()
            if (data) {
                setButtonLodding(false)
                e.target.reset()
                fetchData()
            }
            if (data.message) {
                toast.success(data.message)
            }
            if (data.error) {
                replace('/auth/login')
            }
        }
        catch {

        }
    }
    const handelReply = async (e) => {
        e.preventDefault()
        setReplyButton('')
        setButtonLodding(true)
        const value = e.target?.reply?.value
        try {
            let res = await fetch(`https://write-something-server.vercel.app/post/comments/replies/${replyId}`, {
                method: 'POST',
                body: JSON.stringify({ body: value }),
                headers: {
                    'authorizantion': `Bearer ${cookies.cookie?.tokan}`,
                    'Content-type': 'application/json'
                }
            })
            const data = await res.json()
            if (data) {
                setButtonLodding(false)
                e.target.reset()
                fetchData()
            }
            if (data.message) {
                toast.success(data.message)
            }
            if (data.error) {
                replace('/auth/login')
            }
        }
        catch {

        }
    }
    return (
        <div className="flex flex-col gap-5 ">
            <div className="flex justify-between font-semibold text-xl">
                <p className=""><span>{comments.length}</span> Comments</p>
                <button className="text-davy-gray">Login</button>
            </div>
            <div className="flex gap-5">
                <div className="flex gap-2 items-center ">
                    {
                        likes.includes(user?._id) ?
                            <div className="flex gap-1">
                                <button className='cursor-pointer' onClick={() => handleLikes(postId, fetchData)}><FcLike /></button>
                            </div>
                            :
                            <div className="flex gap-1">
                                <button className='cursor-pointer' onClick={() => handleLikes(postId, fetchData)}><FcLikePlaceholder /></button>
                            </div>
                    }
                    <span>Favorite</span>
                </div>
                <TwitterShareButton
                    url={`https://www.linkedin.com/in/resalat-islam/`}
                >
                    <button className="flex gap-2 items-center bg-blue-400 p-1 rounded-md text-white font-semibold">
                        <span className="cursor-pointer "><FaTwitter /> </span>
                        <span>Twitter</span>
                    </button>
                </TwitterShareButton>
                <FacebookShareButton
                    url={`https://www.linkedin.com/in/resalat-islam/`}
                >
                    <button className="flex gap-2 items-center bg-blue-600 p-1 rounded-md text-white font-semibold">
                        <span className="cursor-pointer"><FaFacebookF /></span>
                        <span>Share</span>
                    </button>
                </FacebookShareButton>
            </div>
            {comments.length !== 0 ?
                <div className="flex flex-col gap-10">
                {
                    comments.map(e => <div key={e._id}>
                        <div className="flex justify-between">
                            <div className="flex items-center gap-3 text-lg font-semibold">
                                <Image width={25} height={15} src={e.user?.image} alt="" />
                                <p>{e.user?.name}</p>
                                <p className='sm:text-sm text-[12px] text-davy-gray'>{e?.createdAt?.slice(0, 10)}</p>
                            </div>
                            <a href="#scrl-input" onClick={() => setReplyButton(e._id)} className="flex items-center gap-2 cursor-pointer font-semibold sm:text-xl text-lg text-dark-cyan"><FaReply />Reply</a>
                        </div>
                        <div>
                            <p className="text-lg my-2 text-davy-gray">{e.body}</p>
                        </div>
                        <div className="ml-10">
                            {e.reply &&
                                <div className="flex flex-col gap-7">
                                    {
                                        e.reply.map(inner => <div key={inner._id}>
                                            <div className="flex gap-3 items-center text-lg font-semibold">
                                                <Image width={25} height={15} src={inner.user?.image} alt="" />
                                                <p>{inner.user?.name}</p>
                                                <p className='text-sm text-davy-gray'>{inner.createAt?.slice(0, 10)}</p>
                                            </div>
                                            <div>
                                                <p className="text-lg my-2 text-davy-gray">{inner.body}</p>
                                            </div>
                                        </div>
                                        )}
                                </div>
                            }
                        </div>
                        {replyButton === e._id &&
                            <form id="scrl-input" onSubmit={handelReply}>
                                <textarea className="w-full border-2 border-dark-cyan p-2" name="reply" id="" cols="30" rows="5" placeholder="Reply your comment" required></textarea>
                                {buttonLodding ? 
                                    <p className="bg-dark-cyan cursor-wait py-2 px-9 text-lg inline-block"><Loading /></p>
                                :
                                    <input onClick={() => setReplyId(e._id)} className="px-5 py-2 bg-dark-cyan text-white cursor-pointer" type="submit" value="Submit" />
                                }
                            </form>
                        }
                    </div>
                    )}
            </div>
            :
            <h1 className = 'text-3xl font-semibold text-dark-cyan flex justify-center items-center py-14'>No Comments</h1>
            }
            <div className="flex flex-col gap-5">
                <div className="flex gap-3 text-lg font-semibold">
                    <Image width={25} height={15} src={user ?user?.image: image} alt="" />
                    <p>{user? user.name : 'Test'}</p>
                </div>
                <form onSubmit={handelComment}>
                    <textarea className="w-full border-2 border-dark-cyan p-2" name="comment" id="" cols="30" rows="10" placeholder="Start the discussion" required></textarea>
                    {
                        buttonLodding ?
                            <p className="bg-dark-cyan cursor-wait py-2 px-9 text-lg inline-block"><Loading /></p>
                            :
                            <input className="px-5 cursor-pointer py-2 bg-dark-cyan text-white" type="submit" value="Submit" />
                    }
                </form>
            </div>
        </div>
    );
}

export default Comments;