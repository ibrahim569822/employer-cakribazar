import React from 'react';
import Header from './header.jsx';
import Sidebar from './sidebar.jsx';
import Footer from './footer.jsx';

function Layout({children}) {
    return (
        <>
        <Header />
        <Sidebar />
        <div className="main" id="main">
            {children}
        </div>
        <Footer />
        </>
    );
}

export default Layout;  