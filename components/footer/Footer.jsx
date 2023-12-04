import React from 'react'

import styles from './Footer.module.scss'

const Footer = () => {
    return (
        <footer className={styles.footer_main}>
            <span>{new Date().getFullYear()} &copy; PartyPay. All rights reserved.</span>
        </footer>
    )
}

export default Footer