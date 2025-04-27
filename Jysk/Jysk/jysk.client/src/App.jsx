import { Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Home from './pages/Home';

import Admin from './Admin/pages/Admin';
import Product from './Admin/pages/Product';
import Storage from './Admin/pages/Storage';
import Supply from './Admin/pages/Supply';
import Cargo from './Admin/pages/Cargo';
import Delivery from './Admin/pages/Delivery';
import WriteOff from './Admin/pages/WriteOff';
import Store from './Admin/pages/Store';
import Employee from './Admin/pages/Employee';
import Client from './Admin/pages/Client';
import Order from './Admin/pages/Order';
import Review from './Admin/pages/Review';
import Manufacturer from './Admin/pages/Manufacturer';
import Category from './Admin/pages/Category';
import WorkHours from './Admin/pages/WorkHours';
import Search from './pages/Search';

import './App.scss';
import AdminLayout from './Admin/layouts/AdminLayout';

function App() {
    return (
        <div>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />

                </Route>
                <Route element={<AdminLayout />}>
                    <Route path="/Admin" element={<Admin />}></Route>
                    <Route path="/Admin/Product" element={<Product />}></Route>
                    <Route path="/Admin/Storage" element={<Storage />}></Route>
                    <Route path="/Admin/Supply" element={<Supply />}></Route>
                    <Route path="/Admin/Cargo" element={<Cargo />}></Route>
                    <Route path="/Admin/Delivery" element={<Delivery />}></Route>
                    <Route path="/Admin/WriteOff" element={<WriteOff />}></Route>
                    <Route path="/Admin/Store" element={<Store />}></Route>
                    <Route path="/Admin/Employee" element={<Employee />}></Route>
                    <Route path="/Admin/Client" element={<Client />}></Route>
                    <Route path="/Admin/Order" element={<Order />}></Route>
                    <Route path="/Admin/Review" element={<Review />}></Route>
                    <Route path="/Admin/Manufacturer" element={<Manufacturer />}></Route>
                    <Route path="/Admin/Category" element={<Category />}></Route>
                    <Route path="/Admin/WorkHours" element={<WorkHours />}></Route>
                </Route>
            </Routes>
        </div>
    );
}
export default App;
