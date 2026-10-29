import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "../../context/DashboardContext";
import TaskForm from "../../components/dashboard/TaskForm";
import DeleteConfirmModal from "../../components/dashboard/DeleteConfirmModal";
import ListForm from "../../components/dashboard/ListForm";
import usePaginatedTasks from "../../hooks/usePaginatedTasks";
import Pagination from "../../components/dashboard/Pagination";

function CustomListTasks() {
    const { listName } = useParams();
    const navigate = useNavigate();

    const decodedListName = decodeURIComponent(listName || "");

    const {lists ,handleAddTask ,handleCompleteTask, handleImportantTask, handleDeleteTask, handleUpdateTask, isTaskOverdue,
        handleRenameList,handleDeleteList
    } = useDashboard();
    
    const {tasks: listTasks, pagination, page, setPage, loading, refetch, pageSize, setPageSize} = usePaginatedTasks({list: decodedListName,limit: 10,})

    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [editTaskId, setEditTaskId] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showRenameForm, setShowRenameForm] = useState(false);
    const [showListMenu, setShowListMenu] = useState(false);
    const [showDeleteListConfirm, setShowDeleteListConfirm] = useState(false);
    const [isDeletingList, setIsDeletingList] = useState(false);

    const totalTasks = pagination.totalTasks;
    const completedTasks = listTasks.filter((task) => task.completed).length;
    const pendingTasks = listTasks.filter((task) => !task.completed).length;
    const importantTasks = listTasks.filter((task) => task.important).length;
    const overdueTasks  = listTasks.filter((task) => isTaskOverdue(task)).length;

    const handlePreviousPage = () => {
        setPage((currentPage) => Math.max(currentPage - 1, 1));
    };

    const handleNextPage = () => {
        setPage((currentPage) => Math.min(currentPage + 1, pagination.totalPages));
    };

    const stats = [
        {
            label:"Total Tasks", value: totalTasks , icon:"▣",
        },
        {
            label:"Completed", value: completedTasks , icon:"✓",
        },
        {
            label:"Pending", value: pendingTasks , icon:"◷",
        },
        {
            label:"Important", value: importantTasks, icon:"★",
        },
        {
            label:"Overdue", value: overdueTasks , icon:"!",
        },
    ];

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
                list: decodedListName,
            });
        }

        if (success) {
            setTitle("");
            setDueDate("");
            setShowCreateForm(false);
            refetch();
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

            if (listTasks.length === 1 && page > 1) {
                setPage(page - 1);
            } else {
                refetch();
            }

        } catch (error) {
            console.error("Failed to delete task:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleRenameSubmit = async (newName) => {
        const success = await handleRenameList(decodedListName, newName);

        if (success) {
            setShowRenameForm(false);

            navigate(`/dashboard/list/${encodeURIComponent(newName)}`);
        }
    };

    const confirmDeleteList = async () => {
        setIsDeletingList(true);

        try {
            const success = await handleDeleteList(decodedListName);

            if (success) {
                setShowDeleteListConfirm(false);
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Failed to delete custom list:", error);
        } finally {
            setIsDeletingList(false);
        }
    };

    return (
        <section className="text-[#071A3D]">

            <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold">{decodedListName}</h1>

                    <p className="mt-2 text-orange-400">
                        Create and manage your tasks in {decodedListName} list.
                    </p>
                </div>

                <div className="relative">
                    <button 
                    type="button"
                    onClick={() => setShowListMenu((previous) => !previous)}
                    aria-label="Custom list options"
                    aria-expanded={showListMenu}
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-2xl font-bold text-slate-600 transition hover:bg-slate-100">⋮</button>

                    {showListMenu && (
                        <div className="absolute right-0 top-12 z-30 w-44 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">

                            <button 
                            type="button"
                            onClick={() => {
                                setShowListMenu(false);
                                setShowRenameForm(true);
                            }}
                            className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-orange-50 hover:text-[#E78300]"
                            >
                                Rename
                            </button>

                            <button 
                            type="button"
                            onClick={() => {
                                setShowListMenu(false);
                                setShowDeleteListConfirm(true);
                            }}
                            className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
            
            {/*satistics cards*/}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
                {stats.map((stat) => (
                    <div key={stat.label}
                    className="rounded-2xl border border-orange-100 border-t-4 border-t-[#E78300] bg-white p-5 shadow-sm">

                        <div>
                            <div className="flex items-center justify-between gap-3">
                                <p className="text-sm text-slate-500">{stat.label}</p>

                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF4D6] font-bold text-[#E78300]">
                                    {stat.icon}
                                </span>
                            </div>

                            <p className="mt-3 text-3xl font-bold text-[#071A3D]">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 mb-4 flex items-center justify-between gap-4">

                <h2 className="text-xl font-bold text-[#071A3D]">{decodedListName} Tasks</h2>

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
                
                {listTasks.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-orange-200 bg-[#FFF7ED] px-6 py-10 text-center">
                        <p className="text-lg font-semibold text-[#071A3D]">No tasks</p>

                        <p className="mt-2 text-sm text-slate-500">
                            Click Create Task to add your task.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {listTasks.map((task) => (
                            <div key={task._id}
                            className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-[0_4px_18px_rgba(15,23,42,0.06)]
                            transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:px-5">

                                <div className="flex min-w-0 items-center gap-4">
                                    <button 
                                    type="button"
                                    onClick={async () => {
                                        await handleCompleteTask(task);
                                        refetch();
                                    }}
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
                                    onClick={async () => {
                                        await handleImportantTask(task);
                                        refetch();
                                    }}
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

                {pagination.totalTasks > 0 && (
                <Pagination 
                page={page}
                totalPages={pagination.totalPages}
                totalTasks={pagination.totalTasks}
                pageSize={pageSize}
                onPageSizeChange={(size) => {
                setPageSize(size);
                setPage(1);
                }}
                onPrevious={handlePreviousPage}
                onNext={handleNextPage}
                disabled={loading}/>
            )}

            </div>

            {/*renamelist*/}
            {showRenameForm && (
                <ListForm
                mode="rename"
                initialName={decodedListName}
                existingLists={lists}
                onSubmit={handleRenameSubmit}
                onCancel={() => setShowRenameForm(false)}/>
            )}

            {/*deletelist*/}
            {showDeleteListConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

                        <h2 className="text-xl font-bold text-[#071A3D]">Delete List?</h2>

                        <p className="mt-3 text-sm text-slate-600">
                            Are you sure you want to delete "{decodedListName}" list?
                            All tasks belong to list will be deleted permanently.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button 
                            type="button"
                            onClick={() => setShowDeleteListConfirm(false)}
                            disabled={isDeletingList}
                            className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200">Cancel</button>

                            <button 
                            type="button"
                            onClick={confirmDeleteList}
                            disabled={isDeletingList}
                            className="rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                            >
                                {isDeletingList ? "Deleting..." : "Delete List"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <DeleteConfirmModal
            isOpen={Boolean(taskToDelete)}
            taskTitle={taskToDelete?.title || ""}
            onCancel={() => setTaskToDelete(null)}
            onConfirm={confirmDelete}
            isDeleting={isDeleting}/>

        </section>

    );

}

export default CustomListTasks;