"use client"

import { deleteSpaceAction } from "../action"

type DeleteSpaceModalProps = {
    spaceName: string,
    onClose: () => void,
    spaceId: number
}

export default function DeleteSpaceModal({ spaceName, onClose, spaceId }: DeleteSpaceModalProps){
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="delete-space-title"
                className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111111] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.55)] ring-1 ring-white/6"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/12 text-red-200 ring-1 ring-red-400/15">
                    <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 10.5v4.5m3-4.5v4.5"
                        />
                    </svg>
                </div>

                <h2
                    id="delete-space-title"
                    className="mt-5 text-xl font-semibold tracking-tight text-white"
                >
                    Delete space?
                </h2>

                <p className="mt-3 text-sm leading-6 text-white/55">
                    This will permanently remove
                    <span className="font-medium text-white/80"> {spaceName || "this space"}</span>
                    {" and all notes inside it. This action cannot be undone."}
                </p>

                <div className="mt-7 flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 transition-all duration-200 hover:border-white/20 hover:bg-white/8 hover:text-white"
                    >
                        Cancel
                    </button>

                    <form action={deleteSpaceAction}>
                        <input type="hidden" name="spaceId" value={spaceId} />
                        <button
                            type="submit"
                            className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-200 transition-all duration-200 hover:border-white/20 hover:bg-black hover:text-white"
                        >
                            Delete space
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
