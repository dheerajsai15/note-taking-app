"use server"

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

type signInState = {
    error: string | null
}

export async function signInAction(_previousState, formData: FormData): Promise<signInState>{
    const email = formData.get("email");
    const password = formData.get("password");

    if(!email || !password){
        return {
            error: "Both Email and Password are required fields"
        }
    }

    try{
        await signIn("credentials", { email, password, redirectTo: "/spaces"} )
    } catch(error){
        if(error instanceof AuthError){
            if(error.type == "CredentialsSignin")
                return { error: "Invalid Email or Password" }

            return { error: "Something went wrong while signing in" }
        }

        throw error;
    }

    return { error: null }
}