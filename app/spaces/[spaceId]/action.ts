"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type CreateNoteState = {
    error: string | null
}

export async function createNoteAction(_previousState: CreateNoteState, formData: FormData): Promise<CreateNoteState>{
    const session = await auth();

    if(!session?.user?.id)
        redirect("/login")

    const rawName = formData.get("name")
    const rawSpaceId = formData.get("spaceId")
    const userId = Number(session.user.id);

    if(typeof rawName != "string")
        return { error: "Note Name is required" }
    if(typeof rawSpaceId != "string")
        return { error: "Space Id is required" }

    const name = rawName.trim();
    const spaceId = Number(rawSpaceId)

    if(!name)
        return { error: "Note Name is required" };
    if (Number.isNaN(spaceId)) {
        redirect("/spaces")
    }
    
    if(name.length > 60)
        return { error: "Note name must be under 60 characters" }

    const space = await prisma.space.findFirst({
        where:{
            userId,
            id: spaceId
        }
    })

    if(!space){
        redirect("/spaces")
    }

    const note = await prisma.note.create({
        data: {
            title: name,
            content: "",
            spaceId
        }
    })

    revalidatePath("/spaces", "layout")

    redirect(`/spaces/${spaceId}/notes/${note.id}`)
}