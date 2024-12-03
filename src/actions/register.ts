"use server";

import { RegisterSchema } from '@/schemas';
import * as z from 'zod';
import bcrypt from 'bcryptjs';
import prisma from "@/lib/db";
import { getUserByEmail } from '@/data/user';
// import { generateVerificationToken } from '@/lib/tokens';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validateFields = RegisterSchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "Invalid fields!" }; // Consider throwing an error instead
    }

    const { email, name, password } = validateFields.data; // Access the validated data correctly

    const hashPassword = await bcrypt.hash(password, 10);

    // Check for existing user
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: "Email already in use!" }; // Consistent messaging
    }

     // Check if this is the first user
     const userCount = await prisma.user.count();

      // Assign role based on user count
    const role = userCount === 0 ? "ADMIN" : "USER";

    // Create new user
    await prisma.user.create({
        data: {
            name,
            email,
            password: hashPassword,
            role
        }
    });

    // const verificationToken = await generateVerificationToken(email);

    // TODO: Send verification Token if applicable 

    return { success: "Confirmation Email Sent!" };
};