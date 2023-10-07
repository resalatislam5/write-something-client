import DashboardProvider from "@/middleware/DashboardProvider";

function Dashboardlayout({children}) {
    return (
        <main>
            <DashboardProvider>
                {children}
            </DashboardProvider> 
        </main>
    );
}

export default Dashboardlayout;