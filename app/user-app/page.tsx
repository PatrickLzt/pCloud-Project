import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { RedirectType, redirect } from "next/navigation"
import { cookies } from "next/headers"
import UserNav from "../common/user-nav"

export default async function UserApp() {

    let loggedIn = false

    try {
        const supabase = createServerComponentClient({ cookies })
        const { data: { session }, error } = await supabase.auth.getSession()

        if (session) {
            loggedIn = true
        }
    } catch (error) {
        console.log("User_App", error)
    }
    finally {
        if (!loggedIn) {
            redirect("/", RedirectType.replace)
        }
    }

    return (
        <div>
            <UserNav />
        </div>
    )
}