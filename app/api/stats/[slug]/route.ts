import { RedirectProps } from "@/interfaces/redirectInterface";
import redis from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: RedirectProps){
    const { slug } = await params;
    console.log("slug",slug);
    
    const url = await redis.get(slug);
    if(!url){
        return NextResponse.json({error: "Link not found or expired."}, {status: 404})
    }
    const hits = await redis.get(`${slug}:hits`) ?? 0;
    return NextResponse.json({slug, url, hits})
}