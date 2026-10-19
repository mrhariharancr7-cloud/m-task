import { useEffect, useState } from "react";
import SuperadminLayout from "../components/SuperadminLayout";
import { BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer,PieChart,Pie,Cell,} from "recharts";


function SuperadminReports() {

    const [year, setYear] = useState(new Date().getFullYear());
    const [registrationReport, setRegistrationReport] = useState([]);
    const [userReport, setUserReport] = useState({});
    const [taskReport, setTaskReport] = useState({});
    const [userActivity, setUserActivity] = useState([]);
    
    useEffect(() => {
        const fetchReports = async () => {

            const token = localStorage.getItem("token");

            try {
                const response = await fetch(
                    `http://localhost:5001/api/superadmin/reports?year=${year}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (response.ok) {
                    setRegistrationReport(data.registrationReport);
                    setUserReport(data.userReport);
                    setTaskReport(data.taskReport);
                    setUserActivity(data.userActivity);
                }

            }catch (error) {
                console.error("Error fetching reports:",error);
            }
        };
        fetchReports();

    }, [year]);

    const userAccountData = [
        {
            name: "Active Users",
            value: userReport.activeUsers || 0
        },

        {
            name: "Blocked Users",
            value: userReport.blockedUsers || 0
        },

        {
            name: "Normal Users",
            value: userReport.normalUsers || 0
        },

        {
            name: "superadmins",
            value: userReport.superadmins || 0
        }
    ];

    const ACCOUNT_COLORS = [
        "rgb(27, 241, 20)",
        "rgb(237, 25, 25)",
        "rgb(36, 67, 225)",
        "hsl(29, 88%, 52%)"
    ]

    return (
        <SuperadminLayout>

            <div>

                <h2 className="text-4xl font-bold text-[#071A3D]">
                    Reports Section
                </h2>

                <p className="mt-2 text-lg text-orange-400">
                    Reports of users and tasks in M-Task
                </p>
                
                {/*users-report-charts*/}
                <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">

                {/*user-register-chart*/}
                <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">

                    <div className="flex items-center justify-between">

                        <div>

                            <h3 className="text-xl font-bold text-[#071A3D]">User Registrations</h3>

                            <p className="text-sm text-slate-500 mt-1">
                                New users registered in {year}
                            </p>

                        </div>

                        <select
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                        className="border border-slate-200 rounded-lg px-3 py-2 text-sm">

                            <option value={2025}>2025</option>
                            <option value={2026}>2026</option>
                            <option value={2027}>2027</option>
                            <option value={2028}>2028</option>
                            <option value={2029}>2029</option>
                            
                        </select>

                    </div>

                    <div className="h-64 mt-6">

                        <ResponsiveContainer width="100%" height="100%">

                            <BarChart data={registrationReport}>

                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis dataKey="name" />

                                <YAxis allowDecimals={false} />

                                <Tooltip 
                                formatter={(value) => [value, "Registration Count"]}/>

                                <Bar
                                dataKey="value"
                                fill="#E78300"
                                radius={[6, 6, 0, 0]}/>

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>

                    {/*user-account-chart*/}
                    <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">

                        <h3 className="text-xl font-bold text-[#071A3D]">
                            User Account status
                        </h3>

                        <div className="h-64 mt-6">
                            <ResponsiveContainer width="100%" height="100%">

                                <PieChart>
                                    <Pie
                                        data={userAccountData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={90}>

                                        {userAccountData.map((entry,index) => 
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={ACCOUNT_COLORS[index % ACCOUNT_COLORS.length]}
                                            />)}
                                    </Pie>
                                        
                                        <Tooltip/>
                                </PieChart>

                            </ResponsiveContainer>
                        </div>

                        <div className="flex justify-center gap-6 mt-2">
                            {userAccountData.map((item, index) => (
                                <div 
                                key={item.name}
                                className="flex items-center gap-2 text-sm text-slate-600">
                                    <span className="w-3 h-3 rounded-full"
                                    style={{backgroundColor:ACCOUNT_COLORS[index % ACCOUNT_COLORS.length]}}></span>

                                    <span>{item.name}</span>
                                </div>
                            ))}
                        </div>

                    </div>
 
                </div>

                {/*users-report*/}
                <div className="mt-10">

                    <h3 className="text-2xl font-bold text-[#071A3D]">User Report</h3>

                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">

                        <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-8">
                            <p className="text-sm font-medium text-slate-500">Total Users</p>

                            <p className="mt-3 text-3xl font-bold text-[#071A3D] sm:text-4xl">{userReport.totalUsers || 0}</p>
                        </div>

                        <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-8">
                            <p className="text-sm font-medium text-slate-500">Active Users</p>

                            <p className="mt-3 text-3xl font-bold text-[#071A3D] sm:text-4xl">{userReport.activeUsers || 0}</p>  
                        </div>

                        <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-8">
                            <p className="text-sm font-medium text-slate-500">Blocked Users</p>

                            <p className="mt-3 text-3xl font-bold text-[#071A3D] sm:text-4xl">{userReport.blockedUsers || 0}</p>  
                        </div>

                        <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-8">
                            <p className="text-sm font-medium text-slate-500">Normal Users</p>

                            <p className="mt-3 text-3xl font-bold text-[#071A3D] sm:text-4xl">{userReport.normalUsers || 0}</p>  
                        </div>

                        <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-8">
                            <p className="text-sm font-medium text-slate-500">Superadmins</p>

                            <p className="mt-3 text-3xl font-bold text-[#071A3D] sm:text-4xl">{userReport.superadmins || 0}</p>  
                        </div>

                    </div>

                </div>

                {/*tasks-report*/}
                <div className="mt-10">

                    <h3 className="text-2xl font-bold text-[#071A3D]">Task report</h3>

                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">

                        <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-8">
                            <p className="text-sm font-medium text-slate-500">Total Tasks</p>

                            <p className="mt-3 text-3xl font-bold text-[#071A3D] sm:text-4xl">{taskReport.totalTasks || 0}</p>
                        </div>

                        <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-8">
                            <p className="text-sm font-medium text-slate-500">Completed Tasks</p>

                            <p className="mt-3 text-3xl font-bold text-[#071A3D] sm:text-4xl">{taskReport.completedTasks || 0}</p>
                        </div>

                        <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-8">
                            <p className="text-sm font-medium text-slate-500">Pending Tasks</p>

                            <p className="mt-3 text-3xl font-bold text-[#071A3D] sm:text-4xl">{taskReport.pendingTasks || 0}</p>
                        </div>

                        <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-8">
                            <p className="text-sm font-medium text-slate-500">Important Tasks</p>

                            <p className="mt-3 text-3xl font-bold text-[#071A3D] sm:text-4xl">{taskReport.importantTasks || 0}</p>
                        </div>

                        <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-8">
                            <p className="text-sm font-medium text-slate-500">Overdue Tasks</p>

                            <p className="mt-3 text-3xl font-bold text-[#071A3D] sm:text-4xl">{taskReport.overdueTasks || 0}</p>
                        </div>
 
                    </div>

                </div>

                {/*useractivity-table*/}
                <div className="mt-10">

                    <h3 className="text-2xl font-bold text-[#071A3D]">
                        User Activity
                    </h3>

                    <div className="mt-6 overflow-x-auto rounded-2xl border border-orange-100 bg-white shadow-sm">

                        <table className="w-full">

                            <thead>
                                <tr className="border-b border-orange-100 bg-orange-50/50">

                                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">User Name</th>

                                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Total Tasks</th>

                                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Completed</th>

                                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Pending</th>

                                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Important</th>

                                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Account status</th>

                                </tr>
                            </thead>

                            <tbody>

                                {userActivity.map((user) => (
                                    <tr key={user.name} className="border-b border-slate-100">

                                        <td className="px-6 py-4 text-left text-sm text-slate-900">{user.name}</td>

                                        <td className="px-6 py-4 text-left text-sm text-slate-900">{user.totalTasks}</td>

                                        <td className="px-6 py-4 text-left text-sm text-slate-900">{user.completedTasks}</td>

                                        <td className="px-6 py-4 text-left text-sm text-slate-900">{user.pendingTasks}</td>

                                        <td className="px-6 py-4 text-left text-sm text-slate-900">{user.importantTasks}</td>

                                        <td className="px-6 py-4 text-left text-sm">
                                            <span
                                            className={user.accountStatus === "Active"
                                                ? "inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700"
                                                : "inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700"
                                            }>{user.accountStatus}</span>
                                        </td>

                                    </tr>
                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </SuperadminLayout>
    );
}

export default SuperadminReports;