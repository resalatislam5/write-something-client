import PostDetails from "./PostDetails";

export const metadata = {
  title: "Post details - Write Something",
  description: "Write Something",
};

function PostDetailsPage({params}) {
    return (
        <section className='px-5 pt-10 max-w-[1500px] mx-auto'>
            <PostDetails id={params.id}/>
        </section>
    );
}

export default PostDetailsPage