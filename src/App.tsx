import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import { StorageProvider } from './hooks/storage';

const App: React.FC = () => (
    <BrowserRouter>
        <StorageProvider>
            <Routes />
        </StorageProvider>
    </BrowserRouter>
);

export default App;