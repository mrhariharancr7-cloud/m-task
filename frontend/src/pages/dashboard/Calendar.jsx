import { useState } from "react";
import { useDashboard } from "../../context/DashboardContext";



function Calendar() {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { tasks } = useDashboard();
    const [showTaskPopup, setShowTaskPopup] = useState(false);

    const monthName = currentDate.toLocaleDateString("en-US", {month: "long", year: "numeric"})

    const changeMonth = (amount) => {
        setCurrentDate((priviousDate) => {
            return new Date(
                priviousDate.getFullYear(),
                priviousDate.getMonth() + amount,
                1
            );
        });
    };

    const goToToday = () => {
        setCurrentDate(new Date());
    };

    const firstDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(), 1
    ).getDay();

    const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1, 0
    ).getDate();

    const emptyDays = Array(firstDay).fill(null);

    const dates = Array.from(
        { length: daysInMonth },
        (_, index) => index + 1
    );

    const calendarDays = [...emptyDays, ...dates];

    const getTasksForDate = (day) => {
        if (!day) return [];

        return tasks.filter((task) => {
            if (!task.dueDate) return false;

            const dueDate = new Date(task.dueDate);

            return (
                dueDate.getDate() === day &&
                dueDate.getMonth() === currentDate.getMonth() &&
                dueDate.getFullYear() === currentDate.getFullYear()
            );
        });
    };
    
    const today = new Date();

    const isToday = (day) => {
        return (
            day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear()
        );
    };

    const isSelectedDate = (day) => {
        return(
            day === selectedDate.getDate() &&
            currentDate.getMonth() === selectedDate.getMonth() &&
            currentDate.getFullYear() === selectedDate.getFullYear()
        );
    };

    return(
        <div className="w-full space-y-6">

            <div>
                <h1 className="text-4xl font-bold text-[#071A3D]">Calendar</h1>

                <p className="mt-2 text-orange-400">
                    View and manage your tasks by due dates.
                </p>

            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex flex-wrap items-center justify-between gap-4">

                    <h2 className="text-xl font-bold text-[#071A3D]">{monthName}</h2>

                    <div className="flex items-center gap-2">
                        <button 
                        type="button"
                        onClick={goToToday}
                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-orange-50">
                            Today
                        </button>

                        <button 
                        type="button"
                        onClick={() => changeMonth(-1)}
                        className="rounded-lg border border-slate-200 px-4 py-2 hover:bg-orange-50"
                        aria-label="Previous month">
                            &lt;
                        </button>

                        <button 
                        type="button"
                        onClick={() => changeMonth(1)}
                        className="rounded-lg border border-slate-200 px-4 py-2 hover:bg-orange-50"
                        aria-label="Next month">
                            &gt;
                        </button>    
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-7 border-b border-slate-100 pb-3 text-center">
                    {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
                        (day) => (
                            <div 
                            key={day}
                            className="text-xs font-semibold text-slate-400">
                                {day}
                            </div>
                        )
                    )}
                </div>


                <div className="mt-3 grid grid-cols-7 gap-2">
                    {calendarDays.map((day, index) => (
                        <div 
                        key={index}
                        onClick={() => {
                            if (!day) return;

                            const clickedDate = new Date(
                                currentDate.getFullYear(),
                                currentDate.getMonth(),
                                day
                            );

                            setSelectedDate(clickedDate);

                            const dayTasks = getTasksForDate(day);

                            if (dayTasks.length > 0) {
                                setShowTaskPopup(true);
                            }
                        }}
                        className={`min-h-20 rounded-lg border p-2 transition ${
                            day && isSelectedDate(day)
                            ? "border-orange-500 bg-orange-50"
                            : "border-slate-100 hover:bg-orange-50"
                            } ${day ? "cursor-pointer" : ""}`}
                        >
                            {day && (
                                <span 
                                className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium ${
                                    isToday(day)
                                    ? "bg-orange-400 text-white"
                                    : "text-[#071A3D]"}`}
                                    >
                                        {day}
                                    </span>
                            )}

                            {day && getTasksForDate(day).map((task) => (
                                <div 
                                key={task._id}
                                className={`mt-1 truncate rounded-md px-1 py-0.5 text-xs font-semibold ${
                                    task.completed
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"}`}
                                    title={task.title}
                                    >
                                        {task.title}
                                    </div>
                            ))}
                        </div>
                    ))}
                </div>

                {showTaskPopup && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

                        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

                            <div className="mb-5 flex items-center justify-between">

                                <div>
                                    <h2 className="text-xl font-bold text-[#071A3D]">Task Details</h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        {selectedDate.toLocaleDateString("en-US", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric"
                                        })}
                                    </p>
                                </div>

                            </div>


                            <div className="max-h-80 space-y-3 overflow-y-auto">

                                {getTasksForDate(selectedDate.getDate()).map((task) => (
                                    <div 
                                    key={task._id}
                                    className="rounded-xl border border-slate-200 p-4">

                                        <h3 className="break-words font-semibold text-[#071A3D]">{task.title}</h3>

                                        <div className="mt-3">
                                            <span 
                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                task.completed
                                                ? "bg-green-100 text-green-700"
                                                : "bg-blue-100 text-blue-700"}`}>
                                                    {task.completed ? "Completed" : "Pending"}
                                                </span>
                                        </div>

                                        <p className="mt-3 text-sm text-slate-500">
                                            List:{" "}
                                            <span className="font-semibold text-[#071A3D]">
                                                {task.list || "My-Tasks"}
                                            </span>
                                        </p>
                                     
                                    </div>

                                ))}
                            </div>

                            <button 
                            type="button"
                            onClick={() => setShowTaskPopup(false)}
                            className="mt-5 w-full rounded-lg bg-orange-400 px-2 py-3 font-semibold text-white transition hover:bg-orange-500">Close</button>

                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Calendar;