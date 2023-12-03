import Party from "@models/party";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const party = await Party.findById(params.id).populate("creator")
        if (!party) return new Response("Party Not Found", { status: 404 });

        return new Response(JSON.stringify(party), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { party, tag } = await request.json();

    try {
        await connectToDB();

        // Find the existing party by ID
        const existingParty = await Party.findById(params.id);

        if (!existingParty) {
            return new Response("Party not found", { status: 404 });
        }

        // Update the party with new data
        existingParty.party = party;
        existingParty.tag = tag;

        await existingParty.save();

        return new Response("Party successfully updated", { status: 200 });
    } catch (error) {
        return new Response("Error updating Party", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try { 
        await connectToDB();

        // Find the party by ID and remove it
        await Party.deleteOne({_id: params.id});

        return new Response("Party deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting Party", { status: 500 });
    }
};
