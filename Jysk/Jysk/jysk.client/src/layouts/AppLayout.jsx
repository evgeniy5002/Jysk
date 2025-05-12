import React, { useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Prefooter from "../components/Prefooter";
import Sidebar from "../components/Sidebar";
import FilterSidebarContent from "../components/FilterSidebarContent";
import SortSidebarContent from "../components/SortSidebarContent";
import { Outlet } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

function AppLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarType, setSidebarType] = useState('filter');
    const [promotionChecked, setPromotionChecked] = useState(false);

    const openSidebar = (type) => {
        setSidebarType(type);
        setSidebarOpen(true);
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
                <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
            )}

            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                title={sidebarType === 'sort' ? 'Sort' : 'Filters'}
                disableClear={sidebarType === 'sort'} 
            >
                {sidebarType === 'sort' ? (
                    <SortSidebarContent />
                ) : (
                    <FilterSidebarContent
                        promotionChecked={promotionChecked}
                        onPromotionChange={handlePromotionChange}
                    />
                )}
            </Sidebar>

            <Header />
            <Breadcrumbs />

            <main className="main-content">
                <Outlet context={{ openSidebar, promotionChecked, onPromotionChange: handlePromotionChange }} />
            </main>
            <Prefooter />
            <Footer />
        </div>
    );
}
export default AppLayout;
