import React, { useEffect } from 'react';
import SearchBar from './SearchBar';
import BattleContext from '../context/BattleContext';
import '../styles/main.css';

const Home = () => {
	const battleContext = React.useContext(BattleContext);
	console.log(battleContext);

	React.useEffect(() => battleContext.loading(), [battleContext]);
	return <div></div>;
};

export default Home;
