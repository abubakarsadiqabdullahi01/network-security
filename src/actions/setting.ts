"use server"

import { getUserById, getUserByEmail } from "@/data/user";
import { currentUser } from "@/lib/auth";
import prisma from "@/lib/db";
import { SettingSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";

export const settings = async (values: z.infer<typeof SettingSchema>) => {
    const user = await currentUser();
    if (!user) {
        return { error: "Unauthorized User!" }
    }
     
    const dbUser = await getUserById(user.id);

    if (!dbUser) {
        return { error: "Unauthorized User!" }
    }

    if (values.email !== user.email) {
        const existingUser = await getUserByEmail(values.email);
        if (existingUser && existingUser.id !== user.id) {
            return { error: "Email already in use!" };
        }
    }

    let updatedValues: any = {
        name: values.name,
        email: values.email,
    };

    if (values.password && values.newPassword) {
        const passwordsMatch = await bcrypt.compare(values.password, dbUser.password || "");
        if (!passwordsMatch) {
            return { error: "Incorrect password!" };
        }
        updatedValues.password = await bcrypt.hash(values.newPassword, 10);
    }

    if (values.role && user.role === "ADMIN") {
        updatedValues.role = values.role;
    }

    try {
        await prisma.user.update({
            where: { id: user.id },
            data: updatedValues,
        });
        return { success: "Settings updated successfully!" };
    } catch (error) {
        console.error("Error updating user settings:", error);
        return { error: "Failed to update settings. Please try again." };
    }
}

