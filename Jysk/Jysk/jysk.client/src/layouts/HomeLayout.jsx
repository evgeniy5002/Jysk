import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from "../components/Header";
import Footer from "../components/Footer";
import Prefooter from "../components/Prefooter";

function HomeLayout() {
    return (
        <>
            <Header />
            <main className="main-content">
                <Outlet />
            </main>
            <Prefooter />
            <Footer />
        </>
    );
}
export default HomeLayout;
