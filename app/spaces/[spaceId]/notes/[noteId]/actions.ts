"use server"

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type UpdateNoteState = {
    error: string | null
}

export async function updateNoteAction(_previousState: UpdateNoteState, formData: FormData): Promise<UpdateNoteState>{
    const session = await auth();
    if(!session?.user?.id)
        redirect("/login")

    const rawSpaceId = formData.get("spaceId")
    const rawNoteId = formData.get("noteId")
    const rawTitle = formData.get("title")
    const rawContent = formData.get("content")

    if (
        typeof rawSpaceId !== "string" ||
        typeof rawNoteId !== "string" ||
        typeof rawTitle !== "string" ||
        typeof rawContent !== "string"
    ) {
        return { error: "Invalid form submission" };
    }

    const parsedSpaceId = Number(rawSpaceId);
    const parsedNoteId = Number(rawNoteId);
    const parsedTitle = rawTitle.trim();
    const parsedContent = rawContent;
    const userId = Number(session.user.id)

    if(Number.isNaN(parsedSpaceId) || Number.isNaN(parsedNoteId))
        redirect("/spaces")

    if(!parsedTitle)
        return { error: "Note title is required" }

    if (parsedTitle.length > 60) {
        return { error: "Note title must be under 60 characters" };
    }

    const note = await prisma.note.findFirst({
        where: {
            id: parsedNoteId,
            spaceId: parsedSpaceId,
            space: {
                userId
            }
        }
    })

    if(!note)
        redirect("/spaces")

    await prisma.note.update({
        where: {
            id: parsedNoteId
        },
        data:{
            title: parsedTitle,
            content: parsedContent
        }
    })

    revalidatePath(`/spaces/${parsedSpaceId}`, "layout")

    redirect(`/spaces/${parsedSpaceId}/notes/${parsedNoteId}`)
}

export async function deleteNoteAction(formData: FormData){
    const session = await auth();
    if(!session?.user?.id)
        redirect("/login")

    const rawSpaceId = formData.get("spaceId")
    const rawNoteId = formData.get("noteId")

    if(typeof rawSpaceId !== "string" || typeof rawNoteId !== "string")
        return;

    const spaceId = Number(rawSpaceId);
    const noteId = Number(rawNoteId);
    const userId = Number(session.user.id)

    if(Number.isNaN(spaceId) || Number.isNaN(noteId)){
        redirect("/spaces")
    }

    const note = await prisma.note.findFirst({
        where:{
            id: noteId,
            spaceId,
            space: {
                userId
            }
        }
    });

    if(!note)
        redirect("/spaces")

    await prisma.note.delete({
        where: {
            id: noteId
        }
    })

    revalidatePath(`/spaces/${spaceId}`, "layout")

    redirect(`/spaces/${spaceId}`);
}
