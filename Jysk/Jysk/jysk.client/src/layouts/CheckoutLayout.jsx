import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import BodySection from "../components/BodySection";
import logo from '../assets/icons/logo.png';
import '../styles/layouts/CheckoutLayout.scss';

function CheckoutLayout() {
    useEffect(() => {
        document.documentElement.classList.add('white-background');

        return () => {
            document.documentElement.classList.remove('white-background');
        };
    }, []);

    return (
        <div className="layout-wrapper">
            <BodySection bgWhite >
                <img className='logo' src={logo}/>
            </BodySection>
            <BodySection bgWhite noBorder>
                <main className="main-content">
                    <Outlet />
                </main>
            </BodySection>

        </div>
    );
}
export default CheckoutLayout;