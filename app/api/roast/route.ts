import { NextRequest, NextResponse } from "next/server"
import { Client, Avatars } from "appwrite"
import OpenAI from "openai";

export async function POST(request: NextRequest) {
    try {
        const { url } = await request.json();
        if (!url) {
            return NextResponse.json({ error: "URL is required!"}, { status: 400})
        }

        const client = new Client()
            .setEndpoint(process.env.APPWRITE_ENDPOINT!)
            .setProject(process.env.APPWRITE_PROJECT_ID!)
        
        const avatars = new Avatars(client)

        const screenshotResult = await avatars.getScreenshot({
            url: url.startsWith("http") ? url : `https://${url}`,
            width: 1280,
            height: 720,
            fullpage: true
        })

        const response = await fetch(screenshotResult)
        const imageBlob = await response.blob();
        
        const base64Image = await blobToBase64(imageBlob)
        
        const openai = new OpenAI({
            baseURL: process.env.AI_BASE_URL!,
            apiKey: process.env.AI_API_KEY!,
        })

        const completion = await openai.chat.completions.create({
            model: "x-ai/grok-4.1-fast",
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: "Roast this website hardcore based on the provided fullpage screenshot. Be funny, critical, and no-nonsense. Highlight design flaws, usability issues, and anything that screams 'noob'.",
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: `data:image/png;base64,${base64Image}`,
                            },
                        },
                    ],
                },
            ],
            max_tokens: 500,
        })

        return NextResponse.json({ roast: completion.choices[0].message.content })
    } catch (error) {
        console.error("API error:", error)
        return NextResponse.json({ error: "Your site was so bad I failed to roast it."}, { status: 500})
    }
}

async function blobToBase64(blob: Blob): Promise<string> {
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer)
    return buffer.toString("base64")
}