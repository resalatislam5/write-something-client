import DashboardSideHeader from "@/app/Shared/DashboardSideHeader";
import DashboardProvider from "@/middleware/DashboardProvider";

function Dashboardlayout({children}) {
    return (
        <main>
            <DashboardProvider>
                <div className="flex relative overflow-hidden">
                    <DashboardSideHeader />
                    {children}
                </div>
            </DashboardProvider> 
        </main>
    );
}

export default Dashboardlayout;