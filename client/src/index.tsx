import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';

import './index.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css'; //core css
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
