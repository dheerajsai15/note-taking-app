"use client"

import { useActionState, useRef, useState } from "react"
import { updateNoteAction } from "./actions"
import DeleteModal from "./delete-modal"
import { Note } from "@/app/generated/prisma/client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function NoteEditor({
    spaceId, noteId, note
}: {
    spaceId: number,
    noteId: number,
    note: Note
}){
    const initialState = { error: null }
    const [ state, formAction, isPending ] = useActionState(updateNoteAction, initialState)
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const [ isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    return <div className="flex h-full flex-1 flex-col overflow-y-auto px-8 py-8 sm:px-10">
            <div className="mb-6 flex items-center justify-between gap-4">
                <p className="text-xs text-white/35">
                    Last updated {new Intl.DateTimeFormat("en", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    }).format(note.updatedAt)}
                </p>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className="group inline-flex cursor-pointer items-center gap-2 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-200 transition-all duration-200 hover:border-white/20 hover:bg-black hover:text-white active:scale-[0.98]"
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
                        Delete
                    </button>

                    <button
                        type="submit"
                        form="note-editor-form"
                        disabled={isPending}
                        className="group inline-flex cursor-pointer items-center gap-2 rounded-xl border border-orange-400/30 bg-orange-500/20 px-5 py-2.5 text-sm font-medium text-orange-200 transition-all duration-200 hover:border-white/20 hover:bg-black hover:text-white active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:border-orange-400/30 disabled:hover:bg-orange-500/20 disabled:hover:text-orange-200 disabled:active:scale-100"
                    >
                        <FontAwesomeIcon
                            icon={isPending ? faSpinner : faSave}
                            className={`h-4 w-4 text-orange-400 transition-colors duration-200 ${
                                isPending ? "animate-spin" : "group-hover:text-white"
                            }`}
                        />
                        {isPending ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>

            {state.error && (
                <p className="mb-5 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {state.error}
                </p>
            )}

            <form id="note-editor-form" className="flex flex-1 flex-col" action={formAction}>
                <input type="hidden" name="spaceId" value={spaceId} />
                <input type="hidden" name="noteId" value={noteId} />

                <input
                    name="title"
                    type="text"
                    defaultValue={note.title}
                    placeholder="Untitled note"
                    className="w-full border-0 bg-transparent px-0 text-4xl font-semibold tracking-tight text-white outline-none placeholder:text-white/20"
                    onKeyDown={e => {
                        if(e.key == "Enter" && !e.nativeEvent.isComposing){
                            e.preventDefault()
                            contentRef.current?.focus()
                        }
                    }}
                />

                <div className="mt-5 h-px bg-white/8" />

                <textarea
                    name="content"
                    defaultValue={note.content}
                    ref={contentRef}
                    placeholder="Start writing your note here..."
                    className="mt-6 min-h-96 flex-1 resize-none bg-transparent px-0 text-base leading-7 text-white/85 outline-none placeholder:text-white/20"
                />
            </form>

            {isDeleteModalOpen && (
                <DeleteModal
                    noteTitle={note.title}
                    noteId={noteId}
                    spaceId={spaceId}
                    onClose={() => setIsDeleteModalOpen(false)}
                />
            )}
        </div>
}
