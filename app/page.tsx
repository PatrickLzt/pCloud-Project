import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { RedirectType, redirect } from "next/navigation"
import { cookies } from "next/headers"
import { CreateAccount } from "@/components/auth/create-account-form"
import { LoginAccount } from "@/components/auth/login-account-form"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default async function Home() {

  let loggedIn = false

  try {
    const supabase = createServerComponentClient({ cookies })
    const { data: { session }, error } = await supabase.auth.getSession()

    if (session) {
      loggedIn = true
    }
  } catch (error) {
    console.log("Home", error)
  }
  finally {
    if (loggedIn) {
      redirect("/user-app", RedirectType.replace)
    }
  }

  return (
    <div className="flex flex-col h-screen w-full justify-center items-center">
      <Tabs defaultValue="create-account" className="w-[400px] border rounded-md pb-4 shadow-2xl">
        <TabsList className="flex justify-around items-center rounded-b-none h-14">
          <TabsTrigger value="create-account" className="transition-all delay-200">Account</TabsTrigger>
          <TabsTrigger value="login" className="transition-all delay-200">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="create-account">
          <CreateAccount />
        </TabsContent>
        <TabsContent value="login">
          <LoginAccount />
        </TabsContent>
      </Tabs></div>

  )
}
