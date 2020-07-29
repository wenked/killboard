import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './layout/Layout';
import BattleContext from '../context/BattleContext';
import './pages/KillboardList.css';
import Routes from './Routes';
import '../styles/main.css';
import { ReactQueryDevtools } from 'react-query-devtools';
import { usePaginatedQuery } from 'react-query';
import { request } from 'graphql-request';
import { queryBattleList } from '../utils/queries';
import SearchBar from './layout/SearchBar';

// 'https://ablionapigraphql.herokuapp.com/graphql'
const fetcher = async (query, variables) => {
	const fetch = await request(
		'https://ablionapigraphql.herokuapp.com/graphql',
		query,
		variables
	);
	return fetch;
};

const App = () => {
	const [offset, setOffSet] = React.useState(0);
	const [searchTerm, setSearchTerm] = React.useState('');
	const [minPlayerCount, setMinPlayerCount] = React.useState(0);
	const variables = {
		guildName: searchTerm,
		offSet: offset,
	};

	const { isLoading, isFetching, resolvedData, isError } = usePaginatedQuery(
		[queryBattleList, variables],
		fetcher
	);

	return (
		<Router>
			<BattleContext.Provider
				value={{
					battles: resolvedData,
					isLoading,
					isError,
					setOffSet,
					offset,
					isFetching,
				}}>
				<ReactQueryDevtools initialIsOpen={false} />
				<Layout>
					<SearchBar
						setSearchTerm={setSearchTerm}
						setMinPlayerCount={setMinPlayerCount}
						searchTerm={searchTerm}
						minPlayerCount={minPlayerCount}
					/>
					<Routes />
				</Layout>
			</BattleContext.Provider>
		</Router>
	);
};

export default App;
