import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function NotesLayout({
    children,
    params
}: {
    children: ReactNode,
    params: Promise<{ spaceId: string}>
}){
    const session = await auth();

    if(!session?.user?.id)
        redirect("/login")

    const { spaceId } = await params;
    const userId = Number(session.user.id)
    const parsedSpaceId = Number(spaceId)

    if (Number.isNaN(parsedSpaceId)) {
        notFound()
    }

    const space = await prisma.space.findFirst({
        where: {
            id: parsedSpaceId,
            userId
        },

        include: {
            notes:  {
                orderBy: {
                    updatedAt: "desc"
                }
            }
        }
    });

    if (!space) {
        notFound()
    }

    return (
        <div className="flex h-full min-w-0">
            <aside className="flex w-80 shrink-0 flex-col border-r border-white/8 bg-[#060606]">
                <div className="border-b border-white/8 px-5 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/35">
                        Notes
                    </p>
                    <div className="mt-3 flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <h1 className="truncate text-lg font-semibold tracking-tight text-white/90">
                                {space.name}
                            </h1>
                            <p className="mt-1 text-xs text-white/35">
                                {space.notes.length} {space.notes.length === 1 ? "note" : "notes"}
                            </p>
                        </div>

                        <button
                            type="button"
                            className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition-all duration-200 hover:border-orange-400/30 hover:bg-white/8 hover:text-orange-300"
                            aria-label="Create note"
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
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto px-3 py-3">
                    {space.notes.length === 0 ? (
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
                            <p className="mt-1 max-w-[13rem] text-xs leading-5 text-white/28">
                                Add your first note to start building out this space.
                            </p>
                        </div>
                    ) : (
                        <ul className="space-y-1.5">
                            {space.notes.map((note) => (
                                <li key={note.id}>
                                    <Link
                                        href={`/spaces/${parsedSpaceId}/notes/${note.id}`}
                                        className="group flex rounded-2xl border border-transparent bg-white/[0.02] px-4 py-3 transition-all duration-150 hover:border-white/10 hover:bg-white/[0.05]"
                                    >
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium text-white/75 transition-colors group-hover:text-white">
                                                {note.title}
                                            </p>
                                            <p className="mt-1 text-xs text-white/28">
                                                Updated {new Intl.DateTimeFormat("en", {
                                                    month: "short",
                                                    day: "numeric",
                                                }).format(note.updatedAt)}
                                            </p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </nav>
            </aside>

            <section className="flex min-w-0 flex-1 flex-col bg-[#050505]">
                {children}
            </section>
        </div>
    )
}
