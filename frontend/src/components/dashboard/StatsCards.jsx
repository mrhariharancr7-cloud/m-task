import { useDashboard } from "../../context/DashboardContext";

function StatsCards() {
    const { totalTasks, completedTasks, pendingTasks, importantTasks, overdueTasks, lists,} = useDashboard();

    const stats = [
        {
            title:"Total Tasks", value: totalTasks , icon:"▣",
        },
        {
            title:"Total Lists", value: lists.length , icon:"☰",
        },
        {
            title:"Completed", value: completedTasks , icon:"✓",
        },
        {
            title:"Pending", value: pendingTasks , icon:"◷",
        },
        {
            title:"Important", value: importantTasks, icon:"★",
        },
        {
            title:"Overdue", value: overdueTasks , icon:"!",
        },
        
    ];

    return (

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">

            {stats.map((stat) => (
                <div key={stat.title}
                className="min-w-0 rounded-2xl border border-orange-100 border-t-4 border-t-[#E78300] bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md sm:p-5">

                    <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-slate-500">{stat.title}</p>

                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF4D6] text-lg font-bold text-[#E78300]">
                            {stat.icon}
                        </span>
                    </div>

                    <p className="mt-3 text-2xl font-bold text-[#071A3D] sm:text-3xl">{stat.value}</p>

                </div>
            ))}
        </div>
    );
}

export default StatsCards;