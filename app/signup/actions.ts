"use server"
import { redirect } from 'next/navigation';
import { hashPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";

type SignUpState = {
    error: string | null
}


export async function signUpAction(_previousState, formData: FormData): Promise<SignUpState>{
    const email = formData.get("email");
    const password = formData.get("password")
    const confirmPassword = formData.get("confirmPassword")

    if(!email || !password || !confirmPassword)
        return {
            error: "Please Provide all the required fields: Email, Password and Confirm Password"
        };

    if(password != confirmPassword)
        return {
            error :"The provided passwords dont match"
        };

    const userExists = await prisma.user.findUnique({
        where: {
            email: email as string
        }
    });

    if(userExists)
        return {
            error: "The user already exists, please login"
        };

    const passwordHash = await hashPassword(password as string);

    await prisma.user.create({
        data: {
            email: email as string,
            passwordHash: passwordHash
        }
    })

    redirect("/login")
}