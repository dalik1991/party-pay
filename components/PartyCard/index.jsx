"use client";

import styles from './PartyCard.module.scss'

import { useState } from "react";
import Image from "next/image";
import Edit from '@public/assets/icons/edit.svg'
import Delete from '@public/assets/icons/delete.svg'
import Copy from '@public/assets/icons/copy.svg'
import Tick from '@public/assets/icons/tick.svg'
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
                className={styles.card}
            >
                <div
                    className={styles.header}
                    onClick={handleProfileClick}
                >
                    <Image
                        src={post.creator.image}
                        alt={post.creator.username}
                        priority={false}
                        width={90}
                        height={90}
                    />
                    <h3 className={styles.name}>{post.party}</h3>
                </div>

                <div className={styles.link}>
                    <div className={styles.link_text}>
                        {window.location.host}/party/{post._id}
                    </div>
                    <div className={styles.copy} onClick={handleCopy}>
                        {copied === `${window.location.host}/party/${post._id}` ? (
                            <Tick/>
                        ) : (
                            <Copy/>
                        )}
                    </div>
                </div>

                <div
                    className={styles.tag}
                    onClick={() => handleTagClick && handleTagClick(post.tag)}
                >
                    #{post.tag}
                </div>

                {session?.user.id === post.creator._id && pathName === "/profile" && (
                    <div className={styles.buttons}>
                        <div
                            className={styles.edit}
                            onClick={handleEdit}
                        >
                            <Edit/>
                        </div>
                        <div
                            className={styles.delete}
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
