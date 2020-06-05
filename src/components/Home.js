import React, { useEffect } from 'react';
import SearchBar from './SearchBar';
import BattleContext from '../context/BattleContext';
import '../styles/main.css';

const Home = () => {
	const battleContext = React.useContext(BattleContext);
	console.log(battleContext);

	React.useEffect(() => battleContext.loading(), []);
	return <div className='hover:text-orange-1000'>TESTE</div>;
};

export default Home;
