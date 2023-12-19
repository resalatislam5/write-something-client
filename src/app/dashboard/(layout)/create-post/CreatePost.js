'use client'
import Loading from "@/app/components/Loading";
import AuthContext from "@/contexts/authContext";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/navigation";
import { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function CreatePost() {
    const { cookies, lodding, setButtonLodding, buttonLodding } = useContext(AuthContext)
    const [body, setBody] = useState()
    const { replace } = useRouter();
    const { register, handleSubmit } = useForm()
    const editorRef = useRef(null);
    if (lodding) {
        return
    }
    const log = () => {
        if (editorRef.current) {
            setBody(editorRef.current.getContent())
        }
    };
    const createProfile = async (value) => {
        setButtonLodding(true)
        try {
            let res = await fetch('https://write-something-server.vercel.app/post', {
                method: 'POST',
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
                replace('/dashboard')
            }
            if (data.error) {
                data.error?.title &&
                    toast.error(data.error?.title)
                data.error?.body &&
                    toast.error(data.error?.body)
            }
        } catch (e) {
            toString.error('Something was wrong')
        }
    }
    const onSubmit = async (postData) => {
        setButtonLodding(true)
        const { image, title, tags } = postData
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
            const thumbnail = imageData.data.url
            const post = {
                thumbnail,
                body,
                title,
                tags
            }
            createProfile(post)
        }
    }
    return (
        <div >
            <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="text-lg w-full flex flex-col gap-2">
                    <p className="font-medium">Enter Your Title:</p>
                    <input className="border-2 rounded-lg px-3 py-2 border-gray-300" type="text" placeholder="Enter your Title" {...register('title')} required />
                </div>
                <div className="text-lg w-full flex flex-col gap-2">
                    <p className="font-medium">choose Thumbnail:</p>
                    <input className="border-2 rounded-lg px-3 py-2 border-gray-300" type="file" accept="image/*" placeholder="Enter your Title" {...register('image')} required />
                </div>
                <Editor
                    apiKey={process.env.TINY_API_KEY}
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue="<p></p>"
                    init={{
                        height: 400,
                        menubar: false,
                        plugins: ' anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                        file_picker_types: 'image',
                        /* and here's our custom image picker*/
                        file_picker_callback: (cb, value, meta) => {
                            const input = document.createElement('input');
                            input.setAttribute('type', 'file');
                            input.setAttribute('accept', 'image/*');

                            input.addEventListener('change', (e) => {
                                const file = e.target.files[0];

                                const reader = new FileReader();
                                reader.addEventListener('load', () => {
                                    /*
                                      Note: Now we need to register the blob in TinyMCEs image blob
                                      registry. In the next release this part hopefully won't be
                                      necessary, as we are looking to handle it internally.
                                    */
                                    const id = 'blobid' + (new Date()).getTime();
                                    const blobCache = tinymce.activeEditor.editorUpload.blobCache;
                                    const base64 = reader.result.split(',')[1];
                                    const blobInfo = blobCache.create(id, file, base64);
                                    blobCache.add(blobInfo);

                                    /* call the callback and populate the Title field with the file name */
                                    cb(blobInfo.blobUri(), { title: file.name });
                                });
                                reader.readAsDataURL(file);
                            });

                            input.click();
                        },
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px}',
                    }}
                />
                <div className="text-lg w-full flex flex-col gap-2">
                    <p className="font-medium">Enter Some Tag(max 10)</p>
                    <input className="border-2 rounded-lg px-3 py-2 border-gray-300" type="text" placeholder="tag1, tag2, tag3" {...register('tags')} required />
                </div>
                {
                    buttonLodding ?
                        <p className="bg-dark-cyan  py-2 text-lg rounded-none cursor-wait"><Loading /></p>
                        :
                        <input onClick={log} className="bg-dark-cyan  py-2 cursor-pointer text-lg text-white rounded-none" type="submit" value="Create Post" />
                }
            </form>
        </div>
    );
}

export default CreatePost;