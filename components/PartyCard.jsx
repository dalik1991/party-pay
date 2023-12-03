"use client";

import { useState } from "react";
import Image from "next/image";
import Edit from './party-card/edit.svg'
import Delete from './party-card/delete.svg'
import Copy from './party-card/copy.svg'
import Tick from './party-card/tick.svg'
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion"

const PartyCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const partyLink = `${window.location.host}/party/${post._id}`;

  const handleCopy = () => {
    setCopied(partyLink);
    navigator.clipboard.writeText(partyLink);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <AnimatePresence>
      <motion.div
        key={post._id}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.7 }}
        transition={{
          duration: 0.3,
          ease: [0, 0.71, 0.2, 1.01]
        }}
        className='party_card'
      >
        <div
          className='party_user_header'
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt='user_image'
            width={90}
            height={90}
            className='rounded-full object-contain'
          />
          <h3 className='party_creator_name'>{post.party}</h3>
        </div>

        <div className='party_link'>
          <div className='party_link_text'>
            {window.location.host}/party/{post._id}
          </div>

          <div className='copy_button' onClick={handleCopy}>
            {copied === `${window.location.host}/party/${post._id}` ? (
              <Tick/>
            ) : (
              <Copy/>
            )}
          </div>
        </div>

        <div
          className='party_tag'
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          #{post.tag}
        </div>

        {session?.user.id === post.creator._id && pathName === "/profile" && (
          <div className='party_edit_buttons'>
            <div
              className='edit_party'
              onClick={handleEdit}
            >
              <Edit/>
            </div>
            <div
              className='delete_party'
              onClick={handleDelete}
            >
              <Delete/>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default PartyCard;
