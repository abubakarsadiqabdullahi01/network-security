"use server";

import { LoginSchema } from '@/schemas';
import * as z from 'zod';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/route';
import { AuthError } from 'next-auth';
// import { generateVerificationToken } from '@/lib/tokens';
import { getUserByEmail } from '@/data/user';


export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validateFields = LoginSchema.safeParse(values);

    if(!validateFields.success){
        return {error: "Invalid fields!"};
    }

    const {email, password} = validateFields.data;

    const existingUser = await getUserByEmail(email);

    if(!existingUser || !existingUser.email || !existingUser.password){
        return {error: "Email does not exist!"}
    }

    // if(!existingUser.emailVerified){
    //     const verificationToken = await generateVerificationToken(
    //         existingUser.email
    //     )

    //     return {success: "Confirmation Email Sent!"}
    // }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin": return {error: "Invalid credentials!"}
                default: return {error: "Something went wrong!"}
            }
        }
        throw error;
    }
}