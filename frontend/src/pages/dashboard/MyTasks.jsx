import { useState } from "react";
import { useDashboard } from "../../context/DashboardContext";
import TaskForm from "../../components/dashboard/TaskForm";
import StatsCards from "../../components/dashboard/StatsCards";
import DeleteConfirmModal from "../../components/dashboard/DeleteConfirmModal";

function MyTasks() {
    const {tasks ,handleAddTask ,handleCompleteTask, handleImportantTask, handleDeleteTask, handleUpdateTask, isTaskOverdue,} = useDashboard();

    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [editTaskId, setEditTaskId] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleSubmit = async (taskData) => {
        if (!taskData.title.trim()) {
            alert("Please enter a task title.");
            return;
        }

        let success;

        if (editTaskId !== null) {
            success = await handleUpdateTask(editTaskId, {
                title: taskData.title.trim(),
                dueDate: taskData.dueDate,
            });

            if (success) {
                setEditTaskId(null);
            }
        } else {
            success = await handleAddTask({
                title: taskData.title.trim(),
                dueDate: taskData.dueDate,
                list: "My-Task",
            });
        }

        if (success) {
            setTitle("");
            setDueDate("");
            setShowCreateForm(false);
        }
    };

    const startEditing = (task) => {
        setEditTaskId(task._id);
        setTitle(task.title);
        setDueDate(task.dueDate ? task.dueDate.slice(0, 10) : "");
    };

    const cancelEditing = () => {
        setEditTaskId(null);
        setTitle("");
        setDueDate("");
    };

    const handleDelete = async (task) => {
        setTaskToDelete(task);
    };

    const confirmDelete = async () => {
        if (!taskToDelete) return;

        setIsDeleting(true);

        try {
            await handleDeleteTask(taskToDelete._id);
            setTaskToDelete(null);

        } catch (error) {
            console.error("Failed to delete task:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    return(
        <section className="text-[#071A3D]">

            <div className="mb-6">
                <h1 className="text-4xl font-bold">My Tasks</h1>

                <p className="mt-2 text-orange-400">
                    Stay organized and stay productive.
                </p>
            </div>
            
            <StatsCards />

            <div className="mt-8 mb-4 flex items-center justify-between gap-4">

                <h2 className="text-xl font-bold text-[#071A3D]">My Tasks List</h2>

                <button
                type="button"
                onClick={() => {
                    setEditTaskId(null);
                    setTitle("");
                    setDueDate("");
                    setShowCreateForm(true);
                }}
                className="flex items-center justify-center gap-2 rounded-lg bg-[#E78300] px-5 py-3 font-semibold text-white transition hover:bg-[#D97706]">
                    <span className="text-xl">+</span>
                    Create Task 
                </button>
            </div>

            {showCreateForm && (
                <TaskForm
                onSubmit={handleSubmit}
                onCancel={() => {
                    setShowCreateForm(false);
                    setEditTaskId(null);
                    setTitle("");
                    setDueDate("");
                }}
                initialTitle={title}
                initialDueDate={dueDate}
                isEditing={editTaskId !== null} />
            )}

            <div>
                
                {tasks.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-orange-200 bg-[#FFF7ED] px-6 py-10 text-center">
                        <p className="text-lg font-semibold text-[#071A3D]">No tasks</p>

                        <p className="mt-2 text-sm text-slate-500">
                            Click Create Task to add your task.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {tasks.map((task) => (
                            <div key={task._id}
                            className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_4px_18px_rgba(15,23,42,0.06)]
                            transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:px-6">

                                <div className="flex min-w-0 items-center gap-4">
                                    <button 
                                    type="button"
                                    onClick={() => handleCompleteTask(task)}
                                    aria-label={
                                        task.completed
                                        ? "Mark task as incomplete"
                                        : "Mark task as completed"}
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition hover:scale-105 ${
                                        task.completed
                                        ? "bg-green-600 text-white"
                                        : "border-2 border-slate-300 bg-white text-transparent hover:border-green-500"}`}>
                                            <span className="text-xl font-bold">✓</span>
                                        </button>

                                        <div className="min-w-0">
                                            <h3 className={`break-words text-base font-medium ${
                                                task.completed
                                                ? "text-slate-700"
                                                : "text-slate-700"}`}>
                                                    {task.title}
                                            </h3>

                                            <div className="mt-2 flex flex-wrap items-center gap-2">
                                                <span 
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                    task.completed
                                                    ? "bg-emerald-100 text-emerald-700 font-semibold"
                                                    : "bg-blue-100 text-blue-700 font-semibold"}`}>
                                                        {task.completed ? "Completed" : "Pending"}
                                                </span>

                                                <span className="rounded-md bg-slate-100 px-3 py-1 text-xs text-slate-600 font-semibold">{task.list || "My-Task"}</span>

                                                {task.dueDate && (
                                                    <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ${
                                                        !task.completed && isTaskOverdue(task) 
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-green-100 text-green-700"}`}>
                                                            {!task.completed && isTaskOverdue(task) 
                                                            ? "Overdue:" 
                                                            : "Due:"}{" "}
                                                            {new Date(task.dueDate).toLocaleDateString("en-US", {month: "2-digit",day: "2-digit",year: "numeric",timeZone: "UTC",})}
                                                        </span>
                                                )}
                                            </div>
                                        </div>
                                </div>

                                <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
                                    <button 
                                    type="button"
                                    onClick={() => {
                                        startEditing(task);
                                        setShowCreateForm(true);}}
                                    className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-200">Edit</button>

                                    <button 
                                    type="button"
                                    onClick={() => handleImportantTask(task)}
                                    className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                                        task.important
                                        ? "bg-amber-200 text-amber-800"
                                        : "bg-amber-100 text-amber-700 hover:bg-amber-200"}`}>
                                            {task.important ? "★ Important" : "Not Important"}
                                    </button>

                                    <button 
                                    type="button"
                                    onClick={() => handleDelete(task)}
                                    className="rounded-xl bg-red-100 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-200">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <DeleteConfirmModal
            isOpen={Boolean(taskToDelete)}
            taskTitle={taskToDelete?.title || ""}
            onCancel={() => setTaskToDelete(null)}
            onConfirm={confirmDelete}
            isDeleting={isDeleting}/>

        </section>
    );
}

export default MyTasks;