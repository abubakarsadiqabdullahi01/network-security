"use client";

import React, { useTransition, useState } from 'react'
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useForm } from 'react-hook-form'
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { RegisterSchema } from "@/schemas/index";
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { register } from '@/actions/register';



export const RegisterForm = () => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        },
    });  
    
    const onSubmit = (value: z.infer<typeof RegisterSchema>) => {
        // you can used axios when its api instead of sever component

        setError("");
        setSuccess("");

        startTransition(() => {
            register(value)
            .then((data) => {
                setError(data.error);
                setSuccess(data.success);
            })
        })
    }

  return (
    <CardWrapper headerLabel='Create an account'
     backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
       showSocial>
        <Form {...form}>
            <form
             onSubmit={form.handleSubmit(onSubmit)}
             className="space-y-6"
             >
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field}
                                        placeholder="abubakar.sadiq@example.com"
                                        type="email"

                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                    )}
                    />

                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field}
                                        placeholder="abubakar sadiq"

                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                    )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field}
                                        placeholder="******"
                                        type="password"
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                    )}
                    />
                </div>
                <FormError message={error}/>
                <FormSuccess message={success} />
                <Button 
                 type="submit"
                  className="w-full"
                  disabled={isPending}
                  >Create an account</Button>
            </form>
        </Form>
    </CardWrapper>
  )
}
