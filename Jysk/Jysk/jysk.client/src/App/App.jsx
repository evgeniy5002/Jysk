import { Routes, Route, Navigate } from 'react-router-dom';

import AppLayout from './layouts/AppLayout';
import HomeLayout from './layouts/HomeLayout';
import AdminLayout from '../Admin/layouts/AdminLayout';
import CheckoutLayout from './layouts/CheckoutLayout';

import Admin from '../Admin/pages/Admin';
import Search from './pages/Search';
import Panel from '../Admin/pages/Panel'
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import EditProfile from './components/EditProfile';
import Categories from './pages/Categories';
import Favorites from './components/Favorites';
import MyReviews from './components/MyReviews';
import MyOrders from './components/MyOrders';
import CompletedOrders from './components/CompletedOrders';

import Register from './pages/Register';
import Profile from './pages/Profile';
import Stores from './pages/Stores';
import Login from './pages/Login';
import Store from './pages/Store';
import Home from './pages/Home';
import Work from './pages/Work';
import Product from './pages/Product';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import PaymentMethod from './pages/PaymentMethod';
import PaymentSuccess from './pages/PaymentSuccess';
import Delivery from './pages/Delivery';

import { CartModalProvider } from './context/CartModalContext';
import { CheckoutProvider } from './context/CheckoutContext';
import { WishlistProvider } from './context/WishlistContext'; 
import CartModal from './components/CartModal';

import './App.scss';

function App() {
    return (
        <div>
            <WishlistProvider>
                <CartModalProvider>
                    <Routes>
                        <Route element={<HomeLayout />}>
                            <Route path="/" element={<Home />} />
                        </Route>
                        <Route path="/" element={<AppLayout />}>
                            <Route path="search" element={<Search />} />
                            <Route path="search/product" element={<Product />} />

                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Register />} />
                            <Route path="forgot-password" element={<ForgotPassword />} />
                            <Route path="reset-password" element={<ResetPassword />} />
                            <Route path="stores" element={<Stores />} />
                            <Route path="stores/store" element={<Store />} />
                            <Route path="categories" element={<Categories />} />
                            <Route path="work" element={<Work />} />
                            
                            <Route path="profile" element={<Profile />}>
                                <Route index element={<Navigate to="my-orders" />} />
                                <Route path="my-orders" element={<MyOrders />} />
                                <Route path="completed-orders" element={<CompletedOrders/>} />
                                <Route path="my-reviews" element={<MyReviews />} />
                                <Route path="favorites" element={<Favorites />} />
                                <Route path="edit" element={<EditProfile />} />
                            </Route>

                            <Route path="*" element={<NotFound />} />
                        </Route>

                        <Route
                            path="/"
                            element={
                                <CheckoutProvider>
                                <CheckoutLayout />
                                </CheckoutProvider>
                            }
                        >
                            <Route path="cart" element={<Cart />} />
                            <Route path="payment" element={<Payment />} />
                            <Route path="payment/delivery" element={<Delivery />} />
                            <Route path="payment/payment-method" element={<PaymentMethod />} />
                            <Route path="payment/payment-success" element={<PaymentSuccess />} />
                        </Route>

                        <Route element={<AdminLayout />}>
                            <Route path="/Admin" element={<Admin />}></Route>
                            <Route path="/Admin/Panel" element={<Panel />}></Route>
                        </Route>
                    </Routes>
                    <CartModal />
                </CartModalProvider>
            </WishlistProvider>
        </div>
    );
}
export default App;
