import { Outlet } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Prefooter from "../components/Prefooter";
import Breadcrumbs from '../components/Breadcrumbs';

function AppLayout() {
    return (
        <div className="layout-wrapper">
          <Header />
          <Breadcrumbs />
            <main className="main-content">
              <Outlet />
            </main>
          <Prefooter />
          <Footer />
        </div>
    );
}
export default AppLayout;