"use client";

import styles from './Header.module.scss';

import Logo from '@public/assets/images/logo.svg'

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion"

const Header = () => {
    const { data: session } = useSession();

    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        (async () => {
            const res = await getProviders();
            setProviders(res);
        })();
    }, []);

    return (
        <header className={styles.nav}>
            <Link href='/' className={styles.logo}>
                <Logo/>
            </Link>
        
            {session?.user ? (
                <div className={styles.account}>
                    <motion.div
                        className={styles.box}
                        whileHover={{ scale: [null, 1.3, 1.2] }}
                        transition={{ duration: 0.3 }}
                    >
                        <Image
                            src={session?.user.image}
                            width={70}
                            height={70}
                            priority={true}
                            alt='profile'
                            onClick={() => setToggleDropdown(!toggleDropdown)}
                        />
                    </motion.div>
                    
                    <AnimatePresence>
                        {toggleDropdown && (
                            <motion.div
                                key="dropdown"
                                initial={{ opacity: 0, scale: 0.7 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.7 }}
                                transition={{
                                    duration: 0.3,
                                    ease: [0, 0.71, 0.2, 1.01]
                                }}
                                className={styles.dropdown}
                            >
                                <Link
                                    href='/profile'
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href='/create-party'
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Party
                                </Link>
                                <Link
                                    href='/'
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut({ callbackUrl: '/' });
                                    }}
                                >
                                    Sign Out
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ) : (
                <>
                    {providers && Object.values(providers).map((provider) => (
                        <button
                            type='button'
                            key={provider.name}
                            onClick={() => {
                                signIn(provider.id, { callbackUrl: '/profile' });
                            }}
                            className={styles.button}
                        >
                            Sign in
                        </button>
                    ))}
                </>
            )}
        </header>
    );
};

export default Header;
