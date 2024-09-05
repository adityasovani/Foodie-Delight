import React, { useEffect } from 'react';
import { useNavigate, useNavigation } from 'react-router-dom';
import RouteNames from './Config/routesnames';

function App() {
	const navigate = useNavigate();

	useEffect(() => {
		navigate(RouteNames.LOGIN);
	}, [])
	return <></>
}

export default App;
