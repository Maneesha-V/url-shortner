import redis from "@/lib/redis";
import { log } from "console";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { url } = await req.json();
    if(!url) {
        return NextResponse.json({error: "Url is required."},{status: 400})
    }
    try{
        const parsed = new URL(url);
        if(parsed.protocol !== 'http:' && parsed.protocol !== 'https:'){
            throw new Error("Invalid protocol")
        }
        if(!parsed.hostname.includes(".")){
            throw new Error("Invalid hostname ")
        }
    }catch{
        return NextResponse.json({error: "Invalid URL. Please enter a valid URL." },{status: 400})
    }
    const shortCode = nanoid(6);
    await redis.set(shortCode, url, {ex: 86400})
    return NextResponse.json({shortCode, shortUrl: `http://localhost:3000/${shortCode}`})
}