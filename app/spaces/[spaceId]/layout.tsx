import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { ReactNode } from "react";
import NotesSidebar from "./notes-sidebar";

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
               <NotesSidebar spaceId={space.id} spaceName={space.name} notes={space.notes}/>
            </aside>

            <section className="flex min-w-0 flex-1 flex-col bg-[#050505]">
                {children}
            </section>
        </div>
    )
}
