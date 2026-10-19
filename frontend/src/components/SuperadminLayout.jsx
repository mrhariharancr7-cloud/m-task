import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function SuperadminLayout({ children }) {

    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);

    useEffect(() => {

        const fetchProfile = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await fetch(
                    "http://localhost:5001/api/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (response.ok) {
                    setUser(data.user);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        fetchProfile();
    }, []);

    const handleLogout = async () => {
       const token = localStorage.getItem("token");

       try {
        await fetch("http://localhost:5001/api/logout", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

       } catch (error) {

        console.error("Error recording logout:", error);

       }
       localStorage.removeItem("token");
       localStorage.removeItem("role");
       navigate("/login");
    };

    return (
        <div className="min-h-screen bg-[#f2fbfa]">

            {/*header*/}
            <header className="sticky top-0 z-40 flex min-h-20 items-center justify-between border-b border-slate-200 bg-white px-4 py-3 shadow-sm sm:px-6 lg:px-8">

                <div className="flex items-center gap-3">

                    {/*logo*/}
                    <div className="flex items-center gap-2">

                        {/*logo-icon*/}
                        <div className="w-7 h-7 bg-[#E78300] rounded-lg flex items-center justify-center shadow-sm">
                            <span className="text-white text-lg font-bold">✓</span>
                        </div>

                        {/*logo-name*/}
                        <h1 className="text-2xl font-bold text-[#E78300]">M-Task</h1>
                    </div>

                </div>

                <div className="flex items-center gap-3 sm:gap-5">

                    <div className="min-w-0 text-right">
                        <p className="truncate text-sm font-bold text-[#071A3D] sm:text-base">
                            {user?.name || "superadmin"}
                        </p>

                        <p className="max-w-36 truncate text-xs text-slate-500 sm:max-w-none sm:text-sm">
                            {user?.email || ""}
                        </p>

                        <p className="text-xs font-semibold tracking-wide text-[#E78300]">
                            SUPERADMIN
                        </p>
                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-orange-200 bg-[#FFF4D6] text-sm font-bold uppercase text-[#E78300] sm:h-11 sm:w-11">
                        {(user?.name || "superadmin")
                        .trim()
                        .split(/\s+/)
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                    </div>

                </div>

            </header>

            {/*mainarea-SAdashboard*/}
            <div className="flex">

                {/*sidenavbar*/}
                <aside className="fixed bottom-0 left-0 top-20 z-30 flex w-64 flex-col border-r border-slate-200 bg-white px-3 py-6">

                    <nav className="flex flex-col gap-2">

                        <button 
                        onClick={() => navigate("/superadmin")}
                        className={`block w-full rounded-lg px-4 py-3 text-left text-base font-medium transition-colors duration-200 ${
                            location.pathname === "/superadmin"
                            ? "bg-orange-50 text-[#E78300]" : "text-slate-700 hover:bg-orange-50 hover:text-[#E78300]"}`}>
                            Dashboard
                        </button>

                        <button 
                        onClick={() => navigate("/superadmin/users")}
                        className={`block w-full rounded-lg px-4 py-3 text-left text-base font-medium transition-colors duration-200 ${
                            location.pathname === "/superadmin/users"
                            ? "bg-orange-50 text-[#E78300]" : "text-slate-700 hover:bg-orange-50 hover:text-[#E78300]"}`}>
                            Users
                        </button>

                        <button 
                        onClick={() => navigate("/superadmin/tasks")}
                        className={`block w-full rounded-lg px-4 py-3 text-left text-base font-medium transition-colors duration-200 ${
                            location.pathname === "/superadmin/tasks"
                            ? "bg-orange-50 text-[#E78300]" : "text-slate-700 hover:bg-orange-50 hover:text-[#E78300]"}`}>
                            Tasks
                        </button>

                        <button
                        onClick={() => navigate("/superadmin/reports")}
                        className={`block w-full rounded-lg px-4 py-3 text-left text-base font-medium transition-colors duration-200 ${
                            location.pathname === "/superadmin/reports"
                            ? "bg-orange-50 text-[#E78300]" : "text-slate-700 hover:bg-orange-50 hover:text-[#E78300]"}`}>
                            Reports
                        </button>

                        <button
                        onClick={() => navigate("/superadmin/contact-enquiries")}
                        className={`block w-full rounded-lg px-4 py-3 text-left text-base font-medium transition-colors duration-200 ${
                            location.pathname === "/superadmin/contact-enquiries"
                            ? "bg-orange-50 text-[#E78300]" : "text-slate-700 hover:bg-orange-50 hover:text-[#E78300]"}`}>
                            Contact Queries
                        </button>

                        <button
                        onClick={() => navigate("/superadmin/settings")}
                        className={`block w-full rounded-lg px-4 py-3 text-left text-base font-medium transition-colors duration-200 ${
                            location.pathname === "/superadmin/settings"
                            ? "bg-orange-50 text-[#E78300]" : "text-slate-700 hover:bg-orange-50 hover:text-[#E78300]"}`}>
                            Settings
                        </button>

                        <div className="absolute bottom-4 left-3 right-3 border-t border-slate-200 pt-4">
                            <button 
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-base font-semibold text-red-600 transition-colors duration-200 hover:bg-red-50">
                                
                                <span>Logout</span>
                                <span className="text-xl" aria-hidden="true">⇥</span>
                                
                            </button>
                        </div>

                    </nav>

                </aside>

                {/*pagecontent*/}
                <main className="ml-64 min-w-0 flex-1 bg-white p-4 sm:p-6 lg:p-10">
                    {children}
                </main>

            </div>

        </div>
    );
}

export default SuperadminLayout;