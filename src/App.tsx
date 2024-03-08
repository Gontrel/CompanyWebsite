import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Webpage from './pages/webPage/webpage';
import { setupFirebase } from './lib/firebase';
setupFirebase();

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Webpage />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
