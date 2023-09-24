"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

const formSchema = z.object({
   email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Email is invalid" }),
   password: z
      .string({ required_error: "Password should not be empty" })
      .min(8, { message: "Password should be at least 8 characters long" })
      .max(12),
})

export function CreateAccount() {

   const router = useRouter()
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   })

   const onSubmit = async (values: z.infer<typeof formSchema>) => {

      try {
         const supabase = createClientComponentClient()
         const { email, password } = values

         const { error, data: { user } } = await supabase.auth.signUp({
            email,
            password,
            // options: {
            //    emailRedirectTo: `${location.origin}/auth/callback`,
            // },
         })

         if (user) {
            form.reset()
            // router.push("/")
            router.refresh()
         }
      }
      catch (error) {
         console.error("CreateAccount", error)
      }
   }

   return (
      <div className="flex flex-col items-center justify-center space-y-2">
         <span className="text-2xl font-bold">Hope you enjoy it.</span>
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
                        <FormMessage />
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
                           <Input type="password" placeholder="example123456" {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <Button type="submit">Create Account</Button>
            </form>
         </Form>
      </div>
   )

}