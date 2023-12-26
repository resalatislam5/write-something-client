import Post from "./Post";

export const metadata = {
  title: "Post - Write Something",
  description: "Write Something",
};

function PostPage() {
    return (
        <div className="lg:ml-96 sm:ml-60 ml-24 sm:max-w-[2550px] max-w-[13.5rem] py-6">
            <h2 className="text-3xl py-5 font-bold">Get your all post</h2>
            <Post />
        </div>
    );
}

export default PostPage;