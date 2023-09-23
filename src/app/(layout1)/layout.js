import Header from "../Shared/Header";

function layout({children}) {
    return (
        <div className="max-w-[2560px]">
            <Header />
            {children}
        </div>
    );
}

export default layout;