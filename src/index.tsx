import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {Provider} from 'react-redux';
import {Store} from '@root/store';
import Routes from '@root/routes';
import './styles.css';

const router = createBrowserRouter(Routes);

ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
).render(
    <Provider store={Store}>
        <RouterProvider router={router} />
    </Provider>
);
