export default function pagination({ page, totalPages, totalTasks, pageSize, onPageSizeChange, onPrevious, onNext, disabled = false, }) {

    const start = totalTasks === 0 ? 0 : (page - 1) * pageSize + 1;
    const end = Math.min(page * pageSize, totalTasks);
    const displayTotalPages = Math.max(totalPages, 1);

    return (
        <nav 
        aria-label="Task list pagination"
        className="mt-6 flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-5"
        >
            <div className="flex flex-wrap items-center gap-4">

                <p className="text-slate-600" aria-live="polite">
                    Showing {start}–{end} of {totalTasks} tasks
                </p>

                <label className="flex items-center gap-2 text-slate-600">
                    <select 
                    value={pageSize}
                    onChange={(event) =>
                        onPageSizeChange(Number(event.target.value))}
                    disabled={disabled}
                    className="rounded-lg border border-orange-200 bg-white px-3 py-2 font-medium text-[#071A3D] outline-none
                    focus:border-orange-500 focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {[10, 15, 20, 25].map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>

                    <span>per page</span>

                </label>
                
            </div>

            <div className="flex flex-wrap items-center justify-start gap-3">
                <button 
                type="button"
                onClick={onPrevious}
                disabled={disabled || page <= 1}
                aria-label="Go to previous page"
                className="rounded-xl border border-orange-200 bg-white px-4 py-3 font-medium text-[#071A3D] transition hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    ← Previous
                </button>

                <span 
                className="whitespace-nowrap font-semibold text-[#071A3D]"
                aria-live="polite"
                >
                    Page {page} of {displayTotalPages}
                </span>

                <button 
                type="button"
                onClick={onNext}
                disabled={disabled || totalPages === 0 || page >= totalPages}
                aria-label="Go to next page"
                className="rounded-xl border border-orange-200 bg-white px-4 py-3 font-medium text-[#071A3D] transition hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Next →
                </button>

            </div>
        </nav>
    );
}