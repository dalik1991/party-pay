import Party from "@models/party";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { userId, party, tag } = await request.json();

    try {
        await connectToDB();
        const newParty = new Party({ creator: userId, party, tag });

        await newParty.save();
        return new Response(JSON.stringify(newParty), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new Party", { status: 500 });
    }
}
