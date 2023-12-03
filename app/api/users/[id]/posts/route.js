import Party from "@models/party";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const parties = await Party.find({ creator: params.id }).populate("creator")

        return new Response(JSON.stringify(parties), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch parties created by user", { status: 500 })
    }
} 