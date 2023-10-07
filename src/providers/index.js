'use client'
import { CookiesProvider } from "react-cookie";
import AuthProvider from "./AuthProvider";


function Provider({children}) {
    return (
        <AuthProvider>
            <CookiesProvider>
                {children}
            </CookiesProvider>
        </AuthProvider>
    );
}

export default Provider;