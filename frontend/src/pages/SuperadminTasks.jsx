import { useEffect, useState } from "react";
import SuperadminLayout from "../components/SuperadminLayout";

function SuperadminTasks() {

    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await fetch(
                    "http://localhost:5001/api/superadmin/tasks",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                const data = await response.json();

                if (response.ok) {
                    setTasks(data.tasks);
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();

    }, []);

    return (
    <SuperadminLayout>

        <div>

            <h2 className="text-4xl font-bold text-slate-900">
                Task Management Section
            </h2>

            <p className="mt-2 text-lg text-teal-700">
                Monitor and view tasks across all users
            </p>

            <div className="mt-8 bg-white rounded-2xl shadow-sm overflow-hidden">

                <table className="w-full text-left">

                    <thead>
                        <tr className="border-b border-slate-200">

                            <th className="px-6 py-4 text-sm font-medium text-slate-500">Task</th>

                            <th className="px-6 py-4 text-sm font-medium text-slate-500">User</th>

                            <th className="px-6 py-4 text-sm font-medium text-slate-500">List</th>

                            <th className="px-6 py-4 text-sm font-medium text-slate-500">Status</th>

                            <th className="px-6 py-4 text-sm font-medium text-slate-500">Due Date</th>

                            <th className="px-6 py-4 text-sm font-medium text-slate-500">Priority</th>

                            <th className="px-6 py-4 text-sm font-medium text-slate-500">Actions</th>

                        </tr>
                    </thead>

                    <tbody>

                        {tasks.length === 0 ? (

                            <tr>
                                <td 
                                colSpan="7"
                                className="px-6 py-12 text-center">

                                    <p className="text-lg font-semibold text-slate-900">
                                        No Tasks found
                                    </p>

                                    <p className="mt-2 text-sm text-slate-500">
                                        There is no tasks available
                                    </p>

                                </td>
                            </tr>
                        ) : (
                            tasks.map((task) => (

                                <tr key={task._id}
                                className="border-b border-slate-200">

                                    <td className="px-6 py-4 text-sm text-slate-900">{task.title}</td>

                                    <td className="px-6 py-4 text-sm text-slate-600">{task.user?.name}</td>

                                    <td className="px-6 py-4 text-sm text-slate-600">{task.list}</td>

                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        {task.completed ? "Completed" : "Pending"}
                                    </td>

                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        {task.dueDate
                                        ? new Date(task.dueDate).toLocaleDateString()
                                        : "No due date"}
                                    </td>

                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        {task.important ? "Important" : "Not Important"}
                                    </td>

                                    <td className="px-6 py-4">
                                        <button 
                                        onClick={() => setSelectedTask(task)}
                                        className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700">
                                            View
                                        </button>
                                    </td>

                                </tr>
                            ))
                        )}

                    </tbody>

                </table>

            </div>

        </div>

        {selectedTask && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

                <div className="bg-white rounded-2xl p-8 w-96 shadow-xl">

                    <h2 className="text-2xl font-bold text-slate-900">Task Detail</h2>

                    <div className="mt-5 space-y-3">

                        <p>
                            <span className="font-semibold">Task:</span>{" "}
                            {selectedTask.title}
                        </p>

                        <p>
                            <span className="font-semibold">User:</span>{" "}
                            {selectedTask.user?.name}
                        </p>

                        <p>
                            <span className="font-semibold">Email:</span>{" "}
                            {selectedTask.user?.email}
                        </p>

                        <p>
                            <span className="font-semibold">List:</span>{" "}
                            {selectedTask.list}
                        </p>

                        <p>
                            <span className="font-semibold">Status:</span>{" "}
                            {selectedTask.completed ? "Completed" : "Pending"}
                        </p>

                        <p>
                            <span className="font-semibold">Priority:</span>{" "}
                            {selectedTask.important ? "Important" : "Not Important"}
                        </p>

                        <p>
                            <span className="font-semibold">Due Date:</span>{" "}
                            {selectedTask.dueDate
                            ? new Date(selectedTask.dueDate).toLocaleDateString()
                            : "No due date"}
                        </p>

                    </div>
                    <div className="mt-6 flex justify-center">

                        <button
                        onClick={() => setSelectedTask(null)}
                        className="bg-teal-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-teal-700">Close</button>
                    </div>

                </div>

            </div>
        )}

    </SuperadminLayout>
    );
}

export default SuperadminTasks;