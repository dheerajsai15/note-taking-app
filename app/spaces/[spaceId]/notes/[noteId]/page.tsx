import { auth } from "@/auth"
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import NoteEditor from "./note-editor";

export default async function NoteScreen({
    params
}: {
    params: Promise<{ spaceId: string, noteId: string}>
}){
    const session = await auth();

    if(!session?.user?.id)
        redirect("/login")

    const { spaceId, noteId } = await params;
    const userId = Number(session.user.id);
    const parsedSpaceId = Number(spaceId);
    const parsedNoteId = Number(noteId);

    if(Number.isNaN(parsedNoteId) || Number.isNaN(parsedSpaceId))
        notFound();

    const note = await prisma.note.findFirst({
        where: {
            id: parsedNoteId,
            spaceId: parsedSpaceId,
            space: {
                userId
            }
        }
    });

    if(!note)
        redirect("/spaces")

    return (
       <NoteEditor spaceId={parsedSpaceId} noteId={parsedNoteId} note={note} />
    )
}
