import Party from "@models/party";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const parties = await Party.find({}).populate('creator')

        return new Response(JSON.stringify(parties), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all parties", { status: 500 })
    }
} 