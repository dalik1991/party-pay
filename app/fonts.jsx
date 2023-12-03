import { Inter, Antonio } from 'next/font/google'
 
const inter = Inter({
    weight: ['300'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
})
 
const antonio = Antonio({
    weight: ['700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-antonio',
})

export default [inter, antonio];