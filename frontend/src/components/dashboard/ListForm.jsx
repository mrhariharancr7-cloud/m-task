import { useState } from "react";

function ListForm({ onSubmit, onCancel, existingLists = [], initialName = "", mode = "create" }) {

    const [listName, setListName] = useState(initialName);
    const [error, setError] = useState("");
    const isRenameMode = mode === "rename";


    const handelSubmit = (event) => {
        event.preventDefault();

        const trimmedName = listName.trim();

        if (!trimmedName) {
            setError("Please enter list name.");
            return;
        }

        const alreadyExists = existingLists.some(
            (list) => 
                list.toLowerCase() === trimmedName.toLowerCase() &&
                list.toLowerCase() !== initialName.trim().toLowerCase()
        );

        if (alreadyExists) {
            setError("List with this name already exists");
            return;
        }

        onSubmit(trimmedName);
        setError("");
    };
    
    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

            <form onSubmit={handelSubmit}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

                <h2 className="text-2xl font-bold text-[#071A3D]">
                    {isRenameMode ? "Rename List" : "Create New List"}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                    {isRenameMode
                    ? "rename your custom list."
                    : "Create a custom list to organize your tasks."}
                </p>

                <br />

                <label htmlFor="listName"
                className="mb-2 block text-sm font-semibold text-slate-600">
                    List Name <span className="text-red-500">*</span>
                </label>

                <input 
                id="listName"
                type="text"
                value={listName}
                onChange={(event) => {
                    setListName(event.target.value);
                    setError("");
                }}
                placeholder="Enter list name"
                maxLength={40}
                autoFocus
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-[#071A3D] outline-none transition focus:border-[#E78300] focus:ring-2 focus:ring-orange-100"
                 />

                {error && (
                    <p className="mt-2 text-sm text-red-600">{error}</p>
                )}

                <div className="mt-6 flex justify-end gap-3">
                    <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">Cancel</button>

                    <button 
                    type="submit"
                    className="rounded-xl bg-[#E78300] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D97706]">
                        {isRenameMode ? "Save Changes" : "Create List"}
                    </button>

                </div>
            </form>
        </div>
    );
}

export default ListForm;