import React from 'react';
import axios from 'axios';
import { Loader } from 'semantic-ui-react';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchBar from './SearchBar';
import Layout from './Layout';
import BattleContext from '../context/BattleContext';
import './pages/KillboardList.css';
import Routes from './Routes';
import { ChakraProvider, CSSReset } from '@chakra-ui/core';
import theme, { Theme } from '@chakra-ui/theme';

const App = () => {
	const [battles, setBattles] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	//https://api.kill-board.com/battles/?page=0&limit=50&search=Elevate&group=&startDate=

	const onFormSubmit = async (searchTerm, minPlayerCount) => {
		setIsLoading(true);
		let response;
		if (minPlayerCount === null) {
			response = await axios.get(
				`https://cors-anywhere.herokuapp.com/https://api.kill-board.com/battles/?page=0&limit=100&search=${searchTerm}&group=&startDate=`
			);
		} else {
			// https://api.kill-board.com/battles/?page=0&limit=50&search=&group=BA42&startDate=&minPlayersCount=20
			response = await axios.get(
				`https://cors-anywhere.herokuapp.com/https://api.kill-board.com/battles/?page=0&limit=100&search=${searchTerm}&group=&startDate=&minPlayersCount=${minPlayerCount}`
			);
		}
		setBattles(response.data);
		setIsLoading(false);
	};
	const loadingHandler = () => setIsLoading(false);
	return (
		<ChakraProvider theme={theme}>
			<CSSReset />
			<Router>
				<BattleContext.Provider
					value={{
						battles: battles,
						loading: loadingHandler,
					}}
				>
					<Layout>
						<SearchBar SubmitFunction={onFormSubmit} />
						<Routes />
						{isLoading && (
							<Loader size='big' active inverted>
								Loading...
							</Loader>
						)}
					</Layout>
				</BattleContext.Provider>
			</Router>
		</ChakraProvider>
	);
};

export default App;
