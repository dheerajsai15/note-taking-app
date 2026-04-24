"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export type CreateSpaceState = {
    error: string | null
}

export async function createSpaceAction(_previousState: CreateSpaceState, formData: FormData) : Promise<CreateSpaceState>
{
    const session = await auth();

    if(!session?.user?.id)
        redirect("/login")

    const rawName = formData.get("name")

    if(typeof rawName != "string")
        return { error: "Space Name is required" }

    const name = rawName.trim();

    if(!name)
        return { error: "Space Name is required" };
    
    if(name.length > 60)
        return { error: "Space name must be under 60 characters" }

    const space = await prisma.space.create({
        data: {
            name,
            userId: Number(session.user.id)
        }
    });

    redirect(`/spaces/${space.id}`);
}