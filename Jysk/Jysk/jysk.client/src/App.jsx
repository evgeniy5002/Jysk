import { Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import HomeLayout from './layouts/HomeLayout';

import Home from './pages/Home';
import Product from './pages/Product';

import Admin from './Admin/pages/Admin';
import Search from './pages/Search';
import Panel from './Admin/pages/Panel'

import './App.scss';
import AdminLayout from './Admin/layouts/AdminLayout';

function App() {
    return (
        <div>
            <Routes>
                <Route element={<HomeLayout />}>
                    <Route path="/" element={<Home />} />
                </Route>
                <Route element={<AppLayout />}>
                    <Route path="search" element={<Search />} />
                    <Route path="search/product" element={<Product />} />
                </Route>
                <Route element={<AdminLayout />}>
                    <Route path="/Admin" element={<Admin />}></Route>
                    <Route path="/Admin/Panel" element={<Panel />}></Route>
                </Route>
            </Routes>
        </div>
    );
}
export default App;
