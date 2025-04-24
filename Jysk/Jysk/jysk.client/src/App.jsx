import { Routes, Route, Navigate } from 'react-router-dom';

import './App.scss';
import './styles/reset.scss';

import AppLayout from './layouts/AppLayout';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import NotFound from './pages/NotFound';
import ResetPassword from './pages/ResetPassword';
import { Profile } from './pages/Profile';
import MyOrders from './components/MyOrders';
import Favorites from './components/Favorites';
import EditProfile from './components/EditProfile';
import MyReviews from './components/MyReviews';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="forgot-password" element={<ForgotPassword />} />
                    <Route path="reset-password" element={<ResetPassword />} />
                    <Route path="profile" element={<Profile />}>
                        <Route index element={<Navigate to="my-orders" />} />
                        <Route path="my-orders" element={<MyOrders />} />
                        <Route path="completed-orders" element={<h1>Completed Orders</h1>} />
                        <Route path="my-reviews" element={<MyReviews />} />
                        <Route path="favorites" element={<Favorites />} />
                        <Route path="edit" element={<EditProfile />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </div>
    );
}
export default App;
