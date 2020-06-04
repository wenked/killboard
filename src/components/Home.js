import React, { useEffect } from 'react';
import SearchBar from './SearchBar';
import BattleContext from '../context/BattleContext';

const Home = () => {
	const battleContext = React.useContext(BattleContext);
	console.log(battleContext);

	React.useEffect(() => battleContext.loading(), []);
	return <React.Fragment />;
};

export default Home;
