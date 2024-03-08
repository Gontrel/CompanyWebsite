import { createRoot } from 'react-dom/client';
import App from './App';
import './index.scss';
import { StrictMode } from 'react';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);
