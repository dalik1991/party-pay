import "@styles/reset.scss";
import "@styles/globals.scss";

import Nav from "@components/header/Nav";
import Provider from "@components/Provider";
import Footer from '@components/footer/_footer';

export const metadata = {
  title: "Party Pay",
  description: "Simplifying Post-Event Finances",
};

const RootLayout = ({ children }) => (
  <html lang='en'>
    <body>
      <Provider>
        <main className='app'>
          <Nav />
          {children}
          <Footer/>
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
