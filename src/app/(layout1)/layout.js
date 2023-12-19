import { Suspense } from "react";
import Footer from "../Shared/Footer";
import Header from "../Shared/Header";

function layout({children}) {
    return (
        <div className="max-w-[2560px]">
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default layout;