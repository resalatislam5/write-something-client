import Link from "next/link";
import Profile from "./Profile";

export const metadata = {
  title: "Profile - Write Something",
  description: "Write Something",
};

function Profilepage() {
    return (
        <div className="lg:ml-96 sm:ml-60 ml-24 max-w-7xl py-6">
            <Profile />
        </div>
    );
}

export default Profilepage;