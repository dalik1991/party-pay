"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdateParty = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const partyId = searchParams.get("id");

  const [post, setPost] = useState({ party: "", tag: "", });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPartyDetails = async () => {
      const response = await fetch(`/api/party/${partyId}`);
      const data = await response.json();

      setPost({
        party: data.party,
        tag: data.tag,
      });
    };

    if (partyId) getPartyDetails();
  }, [partyId]);

  const updateParty = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!partyId) return alert("Missing PartyId!");

    try {
      const response = await fetch(`/api/party/${partyId}`, {
        method: "PATCH",
        body: JSON.stringify({
          party: post.party,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Apply'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateParty}
    />
  );
};

export default UpdateParty;
