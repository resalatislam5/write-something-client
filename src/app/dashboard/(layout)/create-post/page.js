import CreatePost from "./CreatePost";

function CreatePostPage() {
    return (
        <div className="lg:ml-96 sm:ml-60 ml-24 sm:max-w-7xl py-6">
            <h2 className="text-3xl py-5 font-bold">Create a new post</h2>
            <CreatePost />
        </div>
    );
}

export default CreatePostPage;