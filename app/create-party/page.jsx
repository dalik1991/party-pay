"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/PartyForm";

const CreateParty = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ party: "", tag: "" });

  const createParty = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/party/new", {
        method: "POST",
        body: JSON.stringify({
          party: post.party,
          userId: session?.user.id,
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
    <section className='form_section'>
      <h1>Create <span>Party</span></h1>
      <div className='container'>
        <Form
          post={post}
          setPost={setPost}
          submitting={submitting}
          handleSubmit={createParty}
          apply='Create'
        />
      </div>
    </section>
  );
};

export default CreateParty;
