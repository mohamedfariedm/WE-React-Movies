import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@fortawesome/fontawesome-free/js/all.min'
import 'bootstrap/dist/js/bootstrap.bundle'
import { QueryClient, QueryClientProvider } from 'react-query';
const root = ReactDOM.createRoot(document.getElementById('root'));
let queryClint=new QueryClient()
root.render(
    <QueryClientProvider client={queryClint}>
        <App />
    </QueryClientProvider>
);


