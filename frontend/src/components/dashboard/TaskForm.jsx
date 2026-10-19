import { useState } from "react";

function TaskForm({onSubmit, onCancel, initialTitle = "", initialDueDate = "", isEditing = false,}) {


    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const title = formData.get("title").trim();
        const dueDate = formData.get("dueDate");

        if (!title) {
            alert("Please enter a task title.");
            return;
        }

        onSubmit({
            title,
            dueDate,
        });
    };

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6 backdrop-blur-sm"
        onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
                onCancel();
            }
        }}>

            <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                    <h2 className="text-xl font-bold text-[#071A3D]">
                        {isEditing ? "Edit Task" : "Create Task"}
                    </h2>

                    <button
                    type="button"
                    onClick={onCancel}
                    aria-label="Close task form"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-2xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-5 px-6 py-6">

                        <div>
                            <label htmlFor="task-title"
                            className="mb-2 block text-sm font-semibold text-slate-600">
                                Task Title <span className="text-red-500">*</span>
                            </label>

                            <input 
                            id="task-title"
                            name="title"
                            type="text"
                            placeholder="Enter task title"
                            defaultValue={initialTitle}
                            autoFocus
                            required
                            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-[#071A3D] outline-none
                            transition placeholder:text-slate-400 focus:border-[#E78300] focus:ring-2 focus:ring-orange-100" />
                        </div>

                        <div>
                            <label htmlFor="task-due-date"
                            className="mb-2 block text-sm font-semibold text-slate-600">
                                Due Date
                            </label>

                            <input 
                            id="task-due-date"
                            name="dueDate"
                            type="date"
                            defaultValue={initialDueDate}
                            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-[#071A3D] outline-none
                            transition placeholder:text-slate-400 focus:border-[#E78300] focus:ring-2 focus:ring-orange-100" />
                        </div>
                    </div>
                    
                    <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/50 px-6 py-5 sm:flex-row sm:justify-end">
                     <button 
                     type="button"
                     onClick={onCancel}
                     className="rounded-lg border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-600 transition hover:bg-slate-100">Cancel</button>

                     <button 
                     type="submit"
                     className="rounded-lg bg-[#E78300] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#D97706]
                     focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2">
                        {isEditing ? "Update Task" : "Create Task"}
                     </button>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default TaskForm;