import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { RedirectType, redirect } from "next/navigation"
import { cookies } from "next/headers"
import { PlusCircleIcon } from "lucide-react"
import { UserAppHeader } from "@/components/user-app-components/user-app-header"
import { Sidebar } from "@/components/user-app-components/user-app-sidebar"
import { Button } from "@/components/ui/button"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import ImageUploadPlaceholder from "@/components/user-app-components/img-upload"


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
        <>
            <div className="md:block">
                <UserAppHeader />
                <div className="border-t">
                    <div className="bg-background">
                        <div className="grid lg:grid-cols-5">
                            <Sidebar className="hidden md:block" />
                            <div className="col-span-3 lg:col-span-4 lg:border-l">
                                <div className="h-full px-4 py-6 lg:px-8">
                                    <Tabs defaultValue="music" className="h-full space-y-6">
                                        <div className="space-between flex items-center">
                                            <TabsList>
                                                <TabsTrigger value="photos" className="relative">
                                                    Photos
                                                </TabsTrigger>
                                                <TabsTrigger value="documents">Documents</TabsTrigger>
                                                <TabsTrigger value="other" disabled>
                                                    Other
                                                </TabsTrigger>
                                            </TabsList>
                                            <div className="ml-auto mr-4">
                                                <Button>
                                                    <PlusCircleIcon className="mr-2 h-4 w-4" />
                                                    Add Collection
                                                </Button>
                                            </div>
                                        </div>
                                        <TabsContent
                                            value="photos"
                                            className="border-none p-0 outline-none"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-1">
                                                    <h2 className="text-2xl font-semibold tracking-tight">
                                                        Photo Collections
                                                    </h2>
                                                    <p className="text-sm text-muted-foreground">
                                                        The photos you already enhanced.
                                                    </p>
                                                </div>
                                            </div>
                                            <Separator className="my-4" />
                                            LISTA
                                            <div className="relative">
                                                <ImageUploadPlaceholder />
                                                {/*} <ScrollArea>
                                                    <div className="flex space-x-4 pb-4">
                                                        {listenNowAlbums.map((album) => (
                                                            <AlbumArtwork
                                                                key={album.name}
                                                                album={album}
                                                                className="w-[250px]"
                                                                aspectRatio="portrait"
                                                                width={250}
                                                                height={330}
                                                            />
                                                        ))}
                                                    </div>
                                                    <ScrollBar orientation="horizontal" />
                                                </ScrollArea>   */}
                                            </div>
                                            <div className="mt-6 space-y-1">
                                                <h2 className="text-2xl font-semibold tracking-tight">
                                                    Made for You
                                                </h2>
                                                <p className="text-sm text-muted-foreground">
                                                    Your personal playlists. Updated daily.
                                                </p>
                                            </div>
                                            <Separator className="my-4" />
                                            LISTA_2
                                            <div className="relative">
                                                {/* <ScrollArea>
                                                    <div className="flex space-x-4 pb-4">
                                                        {madeForYouAlbums.map((album) => (
                                                            <AlbumArtwork
                                                                key={album.name}
                                                                album={album}
                                                                className="w-[150px]"
                                                                aspectRatio="square"
                                                                width={150}
                                                                height={150}
                                                            />
                                                        ))}
                                                    </div>
                                                    <ScrollBar orientation="horizontal" />
                                                        </ScrollArea> */}
                                            </div>
                                        </TabsContent>
                                        <TabsContent
                                            value="documents"
                                            className="h-full flex-col border-none p-0 data-[state=active]:flex"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-1">
                                                    <h2 className="text-2xl font-semibold tracking-tight">
                                                        New Episodes
                                                    </h2>
                                                    <p className="text-sm text-muted-foreground">
                                                        Your favorite podcasts. Updated daily.
                                                    </p>
                                                </div>
                                            </div>
                                            <Separator className="my-4" />
                                        </TabsContent>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}

