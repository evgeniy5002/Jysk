import React, { useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Prefooter from "../components/Prefooter";
import FilterSidebar from "../components/FilterSidebar";
import { Outlet } from 'react-router-dom';

function AppLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [promotionChecked, setPromotionChecked] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(prev => !prev);
    };

    const handlePromotionChange = (nextChecked) => {
        setPromotionChecked(nextChecked);
    };

    return (
        <div
            className="layout-wrapper"
            style={{
                overflow: sidebarOpen ? 'hidden' : 'auto',
                height: sidebarOpen ? '100vh' : 'auto',
            }}
        >
            {sidebarOpen && (
                <div 
                    className="sidebar-overlay" 
                    onClick={() => setSidebarOpen(false)}
                />
            )}
 <FilterSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                promotionChecked={promotionChecked}
                onPromotionChange={handlePromotionChange}
            />

            <Header />
            <main className="main-content">
                <Outlet context={{ toggleSidebar, promotionChecked, onPromotionChange: handlePromotionChange }} />
            </main>
            <Prefooter />
            <Footer />
        </div>
    );
}
export default AppLayout;
