import { useEffect, useState } from "react";
import SuperadminLayout from "../../components/SuperadminLayout";

function SuperadminDashboard() {

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0,
        importantTasks: 0,
        overdueTasks: 0
    });

    useEffect(() => {
        const fetchStats = async () => {

            const token = localStorage.getItem("token");

            try {
                const response = await fetch(
                    "http://localhost:5001/api/superadmin/stats",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                const data = await response.json();

                if (response.ok) {
                    setStats(data);
                }
            } catch (error) {
                console.error("Error fetching statistics:", error);
            }
        };
        fetchStats();

    }, []);

return(
    <SuperadminLayout>
        <div className="mx-auto max-w-7xl">

            <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-[#071A3D] sm:text-4xl">Superadmin Dashboard</h2>

                <p className="mt-3 text-base leading-7 text-orange-500 sm:text-lg">
                    Overview of users and tasks in M-Task.
                </p>
            </div>

            {/*statistics-cards*/}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">

                <div className="group relative overflow-hidden rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition-all
                duration-300 hover:-translate-y-1 hover:border-[#E78300] hover:shadow-lg sm:p-8">

                    <div className="absolute left-0 top-0 h-1 w-full bg-[#E78300]" />

                    <p className="text-sm font-medium text-slate-500">Total Users</p>

                    <h3 className="mt-4 text-4xl font-bold text-[#071A3D]">{stats.totalUsers}</h3>

                    <p className="mt-3 text-sm text-slate-500">Registered users on M-Task</p>
                </div>

                <div className="group relative overflow-hidden rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition-all
                duration-300 hover:-translate-y-1 hover:border-[#E78300] hover:shadow-lg sm:p-8">

                    <div className="absolute left-0 top-0 h-1 w-full bg-[#E78300]" />

                    <p className="text-sm font-medium text-slate-500">Total Tasks</p>

                    <h3 className="mt-4 text-4xl font-bold text-[#071A3D]">{stats.totalTasks}</h3>

                    <p className="mt-3 text-sm text-slate-500">Tasks created on M-Task</p>
                </div>

                <div className="group relative overflow-hidden rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition-all
                duration-300 hover:-translate-y-1 hover:border-[#E78300] hover:shadow-lg sm:p-8">

                    <div className="absolute left-0 top-0 h-1 w-full bg-[#E78300]" />

                    <p className="text-sm font-medium text-slate-500">Completed Tasks</p>

                    <h3 className="mt-4 text-4xl font-bold text-[#071A3D]">{stats.completedTasks}</h3>

                    <p className="mt-3 text-sm text-slate-500">Tasks marked as completed</p>
                </div>

                <div className="group relative overflow-hidden rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition-all
                duration-300 hover:-translate-y-1 hover:border-[#E78300] hover:shadow-lg sm:p-8">

                    <div className="absolute left-0 top-0 h-1 w-full bg-[#E78300]" />

                    <p className="text-sm font-medium text-slate-500">Pending Tasks</p>

                    <h3 className="mt-4 text-4xl font-bold text-[#071A3D]">{stats.pendingTasks}</h3>

                    <p className="mt-3 text-sm text-slate-500">Tasks waiting to be completed</p>
                </div>

                <div className="group relative overflow-hidden rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition-all
                duration-300 hover:-translate-y-1 hover:border-[#E78300] hover:shadow-lg sm:p-8">

                    <div className="absolute left-0 top-0 h-1 w-full bg-[#E78300]" />

                    <p className="text-sm font-medium text-slate-500">Overdue Tasks</p>

                    <h3 className="mt-4 text-4xl font-bold text-[#071A3D]">{stats.overdueTasks}</h3>

                    <p className="mt-3 text-sm text-slate-500">Tasks past their due date</p>
                </div>

                <div className="group relative overflow-hidden rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition-all
                duration-300 hover:-translate-y-1 hover:border-[#E78300] hover:shadow-lg sm:p-8">

                    <div className="absolute left-0 top-0 h-1 w-full bg-[#E78300]" />

                    <p className="text-sm font-medium text-slate-500">Important Tasks</p>

                    <h3 className="mt-4 text-4xl font-bold text-[#071A3D]">{stats.importantTasks}</h3>

                    <p className="mt-3 text-sm text-slate-500">Tasks marked as important</p>
                </div>
            </div>
        </div>
    </SuperadminLayout>
  );
}

export default SuperadminDashboard;