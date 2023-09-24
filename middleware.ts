import { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {

    const res = NextResponse.next()

    try {
        const supabase = createMiddlewareClient({ req, res })
        await supabase.auth.getSession()
    }
    catch (err) {
        console.log("middlware error", err)
    }

    return res
}