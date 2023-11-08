import EditPost from "../EditPost";

function page({params}) {
    return (
        <div className="lg:ml-96 sm:ml-60 ml-24 mr-5 sm:max-w-7xl py-6" >
            <h2 className="text-3xl py-5 font-bold">Edit your post</h2>
           <EditPost id = {params.id} />
        </div>
    );
}

export default page;