import React, { useEffect } from 'react';
import { Header } from './Layouts/Header/Header';
import './App.less';
import Table from './Layouts/Table/TableContainer';
import store from './redux/store';
import { Provider } from 'react-redux';
import { httpRequests } from './api/api';

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<Header />
			<Table />
		</Provider>
	);
};

export default App;
