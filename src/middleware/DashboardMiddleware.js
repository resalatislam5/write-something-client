import AuthContext from "@/contexts/authContext";
import { useContext} from "react";
const { default: DashboardContext } = require("@/contexts/dashboardContext")

const DashboardMiddleware = ({ UserProfileInfo, children }) =>{
    const { lodding, user, cookies } = useContext(AuthContext);
    if (lodding){
        console.log(lodding);
        return
    }
    const value = {
        user,
        UserProfileInfo
    }
    return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
}

export default DashboardMiddleware