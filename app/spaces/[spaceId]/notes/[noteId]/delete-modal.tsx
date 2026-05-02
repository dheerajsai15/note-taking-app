"use client"

import { deleteNoteAction } from "./actions";

type DeleteModalProps = {
  noteTitle: string;
  onClose: () => void;
  noteId: number;
  spaceId: number
};

export default function DeleteModal({ noteTitle, onClose, noteId, spaceId }: DeleteModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-note-title"
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
              d="M6 7.5h12m-9.75 0V6a1.5 1.5 0 011.5-1.5h4.5a1.5 1.5 0 011.5 1.5v1.5m-9 0v10.125A2.625 2.625 0 009.375 20.25h5.25A2.625 2.625 0 0017.25 17.625V7.5M10.5 10.5v6m3-6v6"
            />
          </svg>
        </div>

        <h2
          id="delete-note-title"
          className="mt-5 text-xl font-semibold tracking-tight text-white"
        >
          Delete note?
        </h2>

        <p className="mt-3 text-sm leading-6 text-white/55">
          This will permanently remove
          <span className="font-medium text-white/80"> {noteTitle || "this note"}</span>
          . This action cannot be undone.
        </p>

        <div className="mt-7 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 transition-all duration-200 hover:border-white/20 hover:bg-white/8 hover:text-white"
          >
            Cancel
          </button>

          <form action={deleteNoteAction}>
            <input type="hidden" value={spaceId} name="spaceId"/>
            <input type="hidden" value={noteId} name="noteId"/>
            <button
            type="submit"
            className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-200 transition-all duration-200 hover:border-white/20 hover:bg-black hover:text-white"
            >
                Delete note
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
