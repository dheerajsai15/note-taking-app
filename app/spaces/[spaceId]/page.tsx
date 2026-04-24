export default function NotesPage() {
  return (
    <div className="flex h-full flex-1 items-center justify-center px-8 py-10">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="flex h-18 w-18 items-center justify-center rounded-[1.75rem] bg-white/[0.03] ring-1 ring-white/8">
          <svg
            className="h-9 w-9 text-white/15"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.25}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 3.75h6.879a3.375 3.375 0 012.386.989l2.496 2.496a3.375 3.375 0 01.989 2.386v8.629A2.25 2.25 0 0118 20.5H6a2.25 2.25 0 01-2.25-2.25V6A2.25 2.25 0 016 3.75h1.5z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 10.5h7.5M8.25 14.25h4.5"
            />
          </svg>
        </div>

        <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-300/55">
          Space Ready
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white/85">
          Select a note to start writing
        </h2>
        <p className="mt-3 max-w-sm text-sm leading-6 text-white/30">
          Choose a note from the list to open it here, or create a new note to
          capture your ideas in this space.
        </p>

        <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-left">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-300">
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
          </div>
          <div>
            <p className="text-sm font-medium text-white/70">Create a fresh note</p>
            <p className="mt-0.5 text-xs text-white/35">
              Use the plus button in the notes sidebar when you&apos;re ready.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
