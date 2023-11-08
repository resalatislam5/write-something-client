import EditProfile from "./EditProfile";

function EditProfilePage() {
    return (
        <div className="lg:ml-96 sm:ml-60 ml-24 mr-5 sm:max-w-7xl max-w-[13.5rem] py-6">
            <h2 className="text-3xl py-5 font-bold">Edit your Profile</h2>
            <EditProfile />
        </div>
    );
}

export default EditProfilePage;