export default function SpacesPage() {
  return (
    <div className="flex h-full">
      {/* ── Middle pane placeholder ── */}
      <div className="flex w-80 shrink-0 flex-col border-r border-white/8 bg-[#060606]">
        <div className="flex items-center border-b border-white/8 px-5 py-4">
          <p className="text-sm font-medium text-white/35">Notes</p>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5">
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
          <p className="mt-3 text-sm text-white/30">
            Select a space to see its notes
          </p>
        </div>
      </div>

      {/* ── Main pane placeholder ── */}
      <div className="flex flex-1 flex-col items-center justify-center bg-[#050505] px-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.03] ring-1 ring-white/8">
          <svg
            className="h-8 w-8 text-white/15"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </div>
        <h2 className="mt-5 text-lg font-semibold text-white/50">
          Select a space to get started
        </h2>
        <p className="mt-2 max-w-xs text-sm text-white/25">
          Pick a space from the sidebar, or create a new one to start taking
          notes.
        </p>
      </div>
    </div>
  );
}
