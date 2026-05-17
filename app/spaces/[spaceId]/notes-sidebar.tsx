"use client"

import { Note } from "@/app/generated/prisma/client"
import Link from "next/link"
import { useActionState, useEffect, useRef, useState } from "react"
import { createNoteAction, renameSpaceAction } from "./action"
import { usePathname } from "next/navigation"
import DeleteSpaceModal from "./delete-space-modal"

export default function NotesSidebar({ spaceId, spaceName, notes }: {
    spaceId: number,
    spaceName: string,
    notes: Note[]
}){
    const [isCreating, setIsCreating] = useState(false);
    const initialState = { error: null }
    const [ state, formAction, isPending ] = useActionState(createNoteAction, initialState); 
    const inputRef = useRef<HTMLInputElement>(null);
    const pathname = usePathname();
    const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState(false)
    const [ isRenaming, setIsRenaming ] = useState(false);
    const renameInitialState = { error: null }
    const [ renameState, renameFormAction, isRenamePending ] = useActionState(renameSpaceAction, renameInitialState);
    const renameInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(isCreating)
            inputRef.current?.focus();
    }, [isCreating]);

    useEffect(() => {
        if(isRenaming) {
            renameInputRef.current?.focus();
            renameInputRef.current?.select();
        }
    }, [isRenaming]);

    useEffect(() => {
        if(isRenaming)
            setIsRenaming(false);
    }, [spaceName]);

    return <div>
        <div className="border-b border-white/8 px-5 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/35">
                Notes
            </p>
            <div className="mt-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                    {isRenaming ? (
                        <form action={renameFormAction} className="w-full">
                            <input type="hidden" name="spaceId" value={spaceId} />
                            <input
                                name="spaceName"
                                type="text"
                                defaultValue={spaceName}
                                maxLength={60}
                                disabled={isRenamePending}
                                ref={renameInputRef}
                                className="w-full bg-transparent text-lg font-semibold tracking-tight text-white/90 outline-none placeholder:text-white/25 disabled:opacity-60"
                                onKeyDown={e => {
                                    if(e.key === "Escape" && !isRenamePending){
                                        e.preventDefault();
                                        setIsRenaming(false);
                                    }
                                }}
                                onBlur={() => {
                                    if(!isRenamePending)
                                        setIsRenaming(false);
                                }}
                            />
                            {renameState.error && (
                                <p className="mt-1 text-xs text-red-300/90">{renameState.error}</p>
                            )}
                        </form>
                    ) : (
                        <>
                            <h1 className="truncate text-lg font-semibold tracking-tight text-white/90">
                                {spaceName}
                            </h1>
                            <p className="mt-1 text-xs text-white/35">
                                {notes.length} {notes.length === 1 ? "note" : "notes"}
                            </p>
                        </>
                    )}
                </div>

                <div className="flex shrink-0 items-center gap-2">
                    <button
                        type="button"
                        className="group inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition-all duration-200 hover:border-orange-400/30 hover:bg-white/8 hover:text-orange-300 active:scale-[0.98]"
                        aria-label="Rename space"
                        title="Rename space"
                        onClick={() => setIsRenaming(true)}
                        disabled={isRenaming}
                    >
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                        </svg>
                    </button>

                    <button
                        type="button"
                        className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition-all duration-200 hover:border-orange-400/30 hover:bg-white/8 hover:text-orange-300"
                        aria-label="Create note"
                        onClick={() => setIsCreating(true)}
                        disabled={isPending || isCreating}
                    >
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                    </button>

                    <button
                        type="button"
                        className="group inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-red-400/20 bg-red-500/10 text-red-200 transition-all duration-200 hover:border-white/20 hover:bg-black hover:text-white active:scale-[0.98]"
                        aria-label="Delete space"
                        title="Delete space"
                        onClick={() => setIsDeleteModalOpen(true)}
                    >
                        <svg
                            className="h-4 w-4 transition-colors duration-200 group-hover:text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 7.5h12m-9.75 0V6a1.5 1.5 0 011.5-1.5h4.5a1.5 1.5 0 011.5 1.5v1.5m-9 0v10.125A2.625 2.625 0 009.375 20.25h5.25A2.625 2.625 0 0017.25 17.625V7.5M10.5 10.5v6m3-6v6"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-3">
            {isCreating && (
                <form className="mb-3" action={formAction}>
                    <div className="rounded-2xl border border-orange-400/20 bg-white/[0.04] p-2 ring-1 ring-orange-500/10">
                        <div className="flex items-center gap-3 rounded-xl px-2 py-1">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-500/15 text-xs font-semibold text-orange-300">
                                +
                            </span>
                            <input type="hidden" name="spaceId" value={spaceId} />
                            <input
                                name="name"
                                type="text"
                                placeholder="Untitled note"
                                maxLength={60}
                                disabled={isPending}
                                ref={inputRef}
                                className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-white/25"
                                onKeyDown={e => {
                                    if(e.key == "Escape" && !isPending){
                                        e.preventDefault()
                                        setIsCreating(false)
                                    }
                                }}
                                onBlur={() => {
                                    if(!isPending)
                                        setIsCreating(false)
                                }}
                            />

                        </div>
                        {state.error && (
                            <p className="px-2 pt-2 text-xs text-red-300/90">
                                {state.error}
                            </p>
                        )}
                    </div>
                </form>
            )}

            {notes.length === 0 ? (
                <div className="mt-10 flex flex-col items-center px-4 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/8">
                        <svg
                            className="h-6 w-6 text-white/20"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                            />
                        </svg>
                    </div>
                    <p className="mt-4 text-sm font-medium text-white/55">
                        No notes yet
                    </p>
                    <p className="mt-1 max-w-52 text-xs leading-5 text-white/28">
                        Add your first note to start building out this space.
                    </p>
                </div>
            ) : (
                <ul className="space-y-1.5">
                    {notes.map((note) => {
                        const href = `/spaces/${spaceId}/notes/${note.id}`
                        const isActive = pathname == href;

                        return (
                            <li key={note.id}>
                                <Link
                                    href={href}
                                    className={`group flex rounded-2xl border px-4 py-3 transition-all duration-150 ${
                                        isActive
                                            ? "border-white/10 bg-white/[0.07] ring-1 ring-white/8"
                                            : "border-transparent bg-white/2 hover:border-white/10 hover:bg-white/5"
                                    }`}
                                >
                                    <div className="min-w-0">
                                        <p className={`truncate text-sm font-medium transition-colors ${
                                            isActive
                                                ? "text-white"
                                                : "text-white/75 group-hover:text-white"
                                        }`}>
                                            {note.title}
                                        </p>
                                        <p className={`mt-1 text-xs ${
                                            isActive ? "text-white/40" : "text-white/28"
                                        }`}>
                                            Updated {new Intl.DateTimeFormat("en", {
                                                month: "short",
                                                day: "numeric",
                                            }).format(note.updatedAt)}
                                        </p>
                                    </div>
                                </Link>
                            </li>
                    )})}
                </ul>
            )}
        </nav>

        {isDeleteModalOpen &&
            <DeleteSpaceModal 
                spaceId={spaceId}
                spaceName={spaceName}
                onClose={() => setIsDeleteModalOpen(false)}
            />
        }
    </div>
}
