import { Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Home from './pages/Home';
import Search from './pages/Search';

import './App.scss';

function App() {
    return (
        <div>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />

                </Route>
            </Routes>
        </div>
    );
}
export default App;
