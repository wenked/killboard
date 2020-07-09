import React from 'react';
import axios from 'axios';
import { Loader } from 'semantic-ui-react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './layout/Layout';
import BattleContext from '../context/BattleContext';
import './pages/KillboardList.css';
import Routes from './Routes';
import '../styles/main.css';
import { ReactQueryDevtools } from 'react-query-devtools';
import { useQuery, queryCache } from 'react-query';

//import { ChakraProvider, CSSReset } from '@chakra-ui/core';
//import theme, { Theme } from '@chakra-ui/theme';

const fetchBattles = async (searchTerm, minPlayerCount) => {
	const response = await axios.get(
		`https://cors-anywhere.herokuapp.com/https://api.kill-board.com/battles/?page=0&limit=100&search=${searchTerm}&group=&startDate=&minPlayersCount=${minPlayerCount}`
	);

	return response.data;
};

const App = () => {
	const [searchTerm, setSearchTerm] = React.useState('');
	const [minPlayerCount, setMinPlayerCount] = React.useState(0);
	//https://api.kill-board.com/battles/?page=0&limit=50&search=Elevate&group=&startDate=
	const { isLoading, error, data } = useQuery(
		[searchTerm, minPlayerCount],
		fetchBattles
	);

	const preFetching = async (search, min) => {
		const queryData = await queryCache.prefetchQuery(
			[search, min],
			fetchBattles
		);
	};

	//const loadingHandler = () => setIsLoading(false);
	return (
		<Router>
			<BattleContext.Provider
				value={{
					battles: data,
					preFetching,
				}}>
				<ReactQueryDevtools initialIsOpen={false} />
				<Layout
					setMinPlayerCount={setMinPlayerCount}
					setSearchTerm={setSearchTerm}
					searchTerm={searchTerm}
					minPlayerCount={minPlayerCount}>
					<Routes />
					{isLoading ? (
						<Loader size='big' active inverted>
							Loading...
						</Loader>
					) : data.length === 0 ? (
						<div className='text-gray-1000 font-bold text-xl py-4'>
							Invalid Guild name
						</div>
					) : null}{' '}
				</Layout>
			</BattleContext.Provider>
		</Router>
	);
};

export default App;
