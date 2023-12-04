import "@styles/reset.scss";
import "@styles/globals.scss";

import fonts from './fonts'

import Header from "@components/Header";
import Provider from "@components/Provider";
import Footer from '@components/Footer';

export const metadata = {
    title: "Party Pay",
    description: "Simplifying Post-Event Finances",
};

const RootLayout = ({ children }) => (
    <html lang='en'>
        <body className={`${fonts[0].variable} ${fonts[1].variable}`}>
            <Provider>
                <div className='app'>
                    <Header/>
                    {children}
                    <Footer/>
                </div>
            </Provider>
        </body>
    </html>
);

export default RootLayout;
