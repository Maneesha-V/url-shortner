import { RedirectProps } from "@/interfaces/redirectInterface";
import redis from "@/lib/redis";
import { redirect } from "next/navigation";

export default async function RedirectPage({params}: RedirectProps){
    const {slug} = await params;
    const url = await redis.get<string>(slug);
    if(!url){
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold text-red-500">Link not found or expired!</h1>
            </div>
        )
    }
    await redis.incr(`${slug}:hits`);
    
    redirect(url);
} 