"use client"

import Link from "next/link"
import { Space } from "../generated/prisma/client"
import { useActionState, useEffect, useRef, useState } from "react"
import { createSpaceAction } from "./action"
import { usePathname } from "next/navigation"

export default function SpacesSidebar({ spaces, userEmail } : {
    spaces: Space[],
    userEmail: string
}){
    const [ isCreating, setIsCreating ] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null)
    const initialState = { error: null }
    const [ state, formAction, isPending ] = useActionState(createSpaceAction, initialState);
    const pathname = usePathname();

    useEffect(() => {
        if(isCreating)
            inputRef.current?.focus()
    }, [isCreating])

    return <aside className="flex w-72 shrink-0 flex-col border-r border-white/8 bg-[#0a0a0a]">
        {/* Brand */}
        <div className="flex items-center gap-3 border-b border-white/8 px-5 py-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 text-sm font-bold text-black">
            D
          </div>
          <span className="text-base font-semibold tracking-tight text-white">
            Notes
          </span>
        </div>

        {/* New Space button */}
        <div className="px-3 pt-4 pb-2">
          <button
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm font-medium text-white/70 transition-all duration-200 hover:border-orange-400/30 hover:bg-white/8 hover:text-white"
            onClick={() => setIsCreating(true)}
            type="button"
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
            New Space
          </button>
        </div>

        {/* Spaces heading */}
        <div className="px-5 pt-3 pb-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/35">
            Spaces
          </p>
        </div>

        {/* Spaces list */}
        <nav className="flex-1 overflow-y-auto px-3 pb-4">
          {isCreating && (
            <form action={formAction} className="mb-3">
              <div className="rounded-2xl border border-orange-400/20 bg-white/[0.04] p-2 ring-1 ring-orange-500/10">
                <div className="flex items-center gap-3 rounded-xl px-2 py-1">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-500/15 text-xs font-semibold text-orange-300">
                    +
                  </span>
                  <input
                    ref={inputRef}
                    name="name"
                    type="text"
                    placeholder="Untitled space"
                    disabled={isPending}
                    maxLength={60}
                    onKeyDown={e => {
                        if(e.key == "Escape"){
                            e.preventDefault();
                            setIsCreating(false);
                        }
                    }}
                    onBlur={() => {
                        if(!isPending)
                            setIsCreating(false);
                    }}
                    className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-white/25 disabled:cursor-not-allowed disabled:opacity-60"
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

          {spaces.length === 0 ? (
            <div className="mt-6 flex flex-col items-center gap-2 px-2 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5">
                <svg
                  className="h-5 w-5 text-white/25"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                  />
                </svg>
              </div>
              <p className="text-xs text-white/40">
                No spaces yet.
                <br />
                Create your first space.
              </p>
            </div>
          ) : (
            <ul className="space-y-0.5">
              {spaces.map((space) => {
                const href = `/spaces/${space.id}`;
                const isActive = pathname === href || pathname.startsWith(`${href}/`);

                return (
                  <li key={space.id}>
                    <Link
                      href={href}
                      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                        isActive
                          ? "bg-white/8 text-white ring-1 ring-white/10"
                          : "text-white/65 hover:bg-white/7 hover:text-white"
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-semibold transition-colors ${
                          isActive
                            ? "bg-orange-500/15 text-orange-300"
                            : "bg-white/6 text-white/50 group-hover:bg-orange-500/15 group-hover:text-orange-300"
                        }`}
                      >
                        {space.name.charAt(0).toUpperCase()}
                      </span>
                      <span className="truncate">{space.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </nav>

        {/* Footer: user info */}
        <div className="border-t border-white/8 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/8 text-xs font-semibold text-white/60">
              {userEmail.charAt(0) ?? "U"}
            </div>
            <p className="min-w-0 truncate text-xs text-white/45">
              {userEmail}
            </p>
          </div>
        </div>
      </aside>
}
