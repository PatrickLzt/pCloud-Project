"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"

import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
    email: z
        .string({ required_error: "Email is required." })
        .email({ message: "Please enter a valid email." }),
    password: z
        .string({ required_error: "Password is required." })
        .min(8, { message: "Password must be at least 8 characters." })
        .max(12),
})

export default function CreateAccount() {

    const form = useForm<z.infer<typeof formSchema>>({ // <-- z.infer<typeof formSchema>() is the type of the form object
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log("data", values)
    }

    return (

        <div className="flex flex-col justify-center items-center space-y-2">
            <span className="text-lg font-bold">Hope you enjoy it.</span>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="example@domain.com" {...field} />
                                </FormControl>
                                <FormDescription>This is your email</FormDescription>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="example12456" {...field} />
                                </FormControl>
                                <FormDescription>This is your password</FormDescription>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Create Account</Button>
                </form>
            </Form>
        </div>
    )
}
