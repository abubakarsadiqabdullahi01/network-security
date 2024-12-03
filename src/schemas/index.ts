import * as z from 'zod';


export const SettingSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email({
      message: "Email is required",
    }),
    password: z.string().optional(),
    newPassword: z.string().min(6, "New password must be at least 6 characters").optional(),
    role: z.enum(["USER", "ADMIN"]).optional(),
  });

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(1, {
        message: "Password is required"
    }), 
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(6, {
        message: "Minimum 6 character required",
    }), 
    name: z.string().min(1, {
        message: "Name is required",
    })
});