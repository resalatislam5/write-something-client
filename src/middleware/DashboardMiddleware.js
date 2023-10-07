// import { useContext } from "react";
// import AuthContext from "@/contexts/authContext";

import AuthContext from "@/contexts/authContext";
import {  redirect, useRouter } from "next/navigation";
import { useContext } from "react";
const { default: DashboardContext } = require("@/contexts/dashboardContext")

const DashboardMiddleware =   ({ children }) =>{
    const { lodding, user } = useContext(AuthContext);
    if (lodding){
        console.log(lodding);
        return
    }
    const value = {
        user
    }
    return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
}

export default DashboardMiddleware