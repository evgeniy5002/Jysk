import { Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Home from './pages/Home';

function App() {
    return (
        <div>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<Home />} />
                </Route>
            </Routes>
        </div>
    );
}
export default App;
