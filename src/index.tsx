import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './Components/App/App';
import {Provider} from 'react-redux';
import {store} from './state/store';


import {createRoot} from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <Provider store={store}><App/></Provider>
);

reportWebVitals();
