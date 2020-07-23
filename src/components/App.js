import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './layout/Layout';
import BattleContext from '../context/BattleContext';
import './pages/KillboardList.css';
import Routes from './Routes';
import '../styles/main.css';
import { ReactQueryDevtools } from 'react-query-devtools';
import { useQuery } from 'react-query';
import { request } from 'graphql-request';
import { queryBattleList } from '../utils/queries';
//import { ChakraProvider, CSSReset } from '@chakra-ui/core';
//import theme, { Theme } from '@chakra-ui/theme';

const fetcher = async (query, variables) => {
	const fetch = await request(
		'https://ablionapigraphql.herokuapp.com/graphql',
		query,
		variables
	);
	return fetch;
};

const App = () => {
	const [searchTerm, setSearchTerm] = React.useState('');
	const [minPlayerCount, setMinPlayerCount] = React.useState(0);
	//https://api.kill-board.com/battles/?page=0&limit=50&search=Elevate&group=&startDate=
	const variables = {
		guildName: searchTerm,
	};

	const { isLoading, data, isError } = useQuery(
		[queryBattleList, variables],
		fetcher
	);

	return (
		<Router>
			<BattleContext.Provider
				value={{
					battles: data,
					isLoading,
					isError,
				}}>
				<ReactQueryDevtools initialIsOpen={false} />
				<Layout
					setMinPlayerCount={setMinPlayerCount}
					setSearchTerm={setSearchTerm}
					searchTerm={searchTerm}
					minPlayerCount={minPlayerCount}>
					<Routes />
				</Layout>
			</BattleContext.Provider>
		</Router>
	);
};

export default App;
