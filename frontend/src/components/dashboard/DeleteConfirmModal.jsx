function DeleteConfirmModal({isOpen, taskTitle, onCancel, onConfirm, isDeleting = false,}) {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-[2px]"
        onMouseDown={(e) => {
            if (e.target === e.currentTarget && !isDeleting) {
                onCancel();
            }
        }}>

            <div 
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-task-title"
            className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">

                <h2 id="delete-task-title"
                className="text-xl font-bold text-slate-800">Delete Task</h2>

                <p className="mt-3 break-words text-sm leading-6 text-slate-600">
                    Are you sure you want to permanently delete{" "}
                    <span className="font-semibold text-slate-800">
                        "{taskTitle}"
                    </span>
                    ?
                </p>

                <div className="mt-6 flex justify-end gap-3">
                    <button 
                    type="button"
                    onClick={onCancel}
                    disabled={isDeleting}
                    className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 font-medium text-slate-600
                    transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50">Cancel</button>
                    
                    <button 
                    type="button"
                    onClick={onConfirm}
                    disabled={isDeleting}
                    className="rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50">
                        {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteConfirmModal;