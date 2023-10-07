'use client'

import DashboardMiddleware from "./DashboardMiddleware";
function DashboardProvider({children}) {
    return (
        <div>
            <DashboardMiddleware>
                {children}
            </DashboardMiddleware>
        </div>
    );
}

export default DashboardProvider;