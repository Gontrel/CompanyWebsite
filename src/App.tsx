import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import { setupFirebase } from './lib/firebase';
setupFirebase();

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
