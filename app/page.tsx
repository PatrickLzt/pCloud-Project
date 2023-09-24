import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { RedirectType, redirect } from "next/navigation"
import { cookies } from "next/headers"


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
      return redirect("/user-app", RedirectType.replace)
    }
  }

  return (
    <div>Home</div>
  )
}
