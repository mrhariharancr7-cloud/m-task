import { useEffect, useState } from "react";
import SuperadminLayout from "../components/SuperadminLayout";

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
        <div>

            <h2 className="text-4xl font-bold text-slate-900">Superadmin Dashboard</h2>

                <p className="mt-2 text-lg text-teal-700">Overview of users and tasks in M-Task</p>

                {/*Statistics-Cards*/}
                <div className="grid grid-cols-3 gap-6 mt-8">

                    {/*Total-Users*/}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 min-h-40">

                        <p className="text-sm text-slate-500">Total Users</p>
                        <h3 className="text-4xl font-bold text-slate-900 mt-5">{stats.totalUsers}</h3>
                    </div>

                    {/*Total-Tasks*/}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 min-h-40">

                        <p className="text-sm text-slate-500">Total Tasks</p>
                        <h3 className="text-4xl font-bold text-slate-900 mt-5">{stats.totalTasks}</h3>
                    </div>

                    {/*Completed*/}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 min-h-40">

                        <p className="text-sm text-slate-500">Completed</p>
                        <h3 className="text-4xl font-bold text-slate-900 mt-5">{stats.completedTasks}</h3>
                    </div>

                    {/*Pending*/}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 min-h-40">

                        <p className="text-sm text-slate-500">Pending</p>
                        <h3 className="text-4xl font-bold text-slate-900 mt-5">{stats.pendingTasks}</h3>
                    </div>

                    {/*Overdue*/}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 min-h-40">

                        <p className="text-sm text-slate-500">Overdue</p>
                        <h3 className="text-4xl font-bold text-slate-900 mt-5">{stats.overdueTasks}</h3>
                    </div>

                    {/* Important */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 min-h-40">

                        <p className="text-sm text-slate-500">Important</p>
                        <h3 className="text-4xl font-bold text-slate-900 mt-5">{stats.importantTasks}</h3>
                    </div>

                </div>

        </div>
    </SuperadminLayout>
  );
}

export default SuperadminDashboard;