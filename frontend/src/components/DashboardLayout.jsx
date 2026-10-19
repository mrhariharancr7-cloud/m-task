import { NavLink, Outlet } from "react-router-dom";
import { useDashboard } from "../context/DashboardContext";
import StatsCards from "./dashboard/StatsCards";

function DashboardLayout() {

    const { user, lists, loading, handleLogout } = useDashboard();
    
    const navLinkClass = ({ isActive }) => 
        `flex items-center gap-3 rounded-lg px-4 py-3 font-medium transition-colors ${
            isActive
            ? "bg-[#FFF4D6] text-[#E78300]"
            : "text-[#071A3D] hover:bg-[#FFF7ED] hover:text-[#E78300]"}`;

        if (loading) {
            return (
                <div className="flex min-h-screen items-center justify-center bg-[#FFF7ED]">
                    <p className="font-medium text-[#071A3D]">
                        Loading dashboard...
                    </p>
                </div>
            );
        }

    return (
        <div className="min-h-screen bg-white">

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
                            {user?.name || "User"}
                        </p>

                        <p className="max-w-36 truncate text-xs text-slate-500 sm:max-w-none sm:text-sm">
                            {user?.email || ""}
                        </p>

                        <p className="text-xs font-semibold tracking-wide text-[#E78300]">
                            USER
                        </p>
                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-orange-200 bg-[#FFF4D6] text-sm font-bold uppercase text-[#E78300] sm:h-11 sm:w-11">
                        {(user?.name || "User")
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
                <aside className="fixed bottom-0 left-0 top-20 z-30 flex w-64 flex-col border-r border-orange-100 bg-white px-3 py-6">

                    <nav className="flex flex-col gap-2">

                        <NavLink to="/dashboard" end className={navLinkClass}>
                        <span className="text-lg text-current">☷</span>
                        <span>My-Tasks</span>
                        </NavLink>
                        
                        <NavLink to="/dashboard/important" end className={navLinkClass}>
                        <span className="text-lg text-current">★</span>
                        <span>Important</span>
                        </NavLink>

                        <NavLink to="/dashboard/completed" end className={navLinkClass}>
                         <span className="text-lg text-current">✓</span>
                         <span>Completed</span>
                        </NavLink>

                        <div className="mt-3 border-t border-slate-200 pt-3">
                            <p className="px-4 pb-2 text-xs font-semibold uppercase tracking-wide text-[#E78300]">My Lists</p>

                            {lists.map((list) => (
                                <NavLink
                                key={list}
                                to={`/dashboard/list/${encodeURIComponent(list)}`}
                                className={navLinkClass}>
                                    {list}
                                </NavLink>
                            ))}
                        </div>
                        
                        <NavLink to="/settings" className={navLinkClass}>
                        <span className="text-lg text-current">⚙</span>
                        <span>Settings</span>
                        </NavLink>

                        <div className="absolute bottom-4 left-3 right-3 border-t border-slate-200 pt-4">
                            <button onClick={handleLogout}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-base font-semibold text-red-600 transition-colors duration-200 hover:bg-red-50">
                                <span>Logout</span>
                                <span className="text-xl" aria-hidden="true">⇥</span>
                            </button>
                        </div>

                    </nav>

                </aside>

                {/*pagecontent*/}
                <main className="ml-64 min-w-0 flex-1 bg-white p-4 sm:p-6 lg:p-10">
                    <Outlet context={{ showStats: false }} />
                </main>

            </div>

        </div>
    );
}

export default DashboardLayout;