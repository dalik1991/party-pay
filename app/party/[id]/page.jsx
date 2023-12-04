"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";



const Party = ({ params }) => {
    const router = useRouter();;
    const partyId = params.id;

    const { data: session } = useSession();

    const [myParty, setMyParty] = useState({});

    useEffect(() => {
        const getPartyDetails = async () => {
            const response = await fetch(`/api/party/${partyId}`);
            const data = await response.json();

            console.log(partyId);

            setMyParty({
                party: data.party,
                tag: data.tag,
            });
        };
    
        if (partyId) getPartyDetails();
    }, [partyId]);



    return (
        <div>Party {myParty.party}

        </div>
    )
}

export default Party