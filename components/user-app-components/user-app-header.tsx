"use client";

import UserNav from "@/app/common/user-nav"

export function UserAppHeader() {

    return (
        <header>
            <nav className="flex justify-between items-center m-4">
                <span className="font-extrabold">p<span className="font-extralight">Cloud</span></span>
                <UserNav />
            </nav>
        </header>
    )
}