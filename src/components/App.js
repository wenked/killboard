import React from 'react';
import axios from 'axios';
import { Loader } from 'semantic-ui-react';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchBar from './SearchBar';
import Layout from './Layout';
import BattleContext from '../context/BattleContext';
import './pages/KillboardList.css';
import Routes from './Routes';

const App = () => {
	const [battles, setBattles] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	//https://api.kill-board.com/battles/?page=0&limit=50&search=Elevate&group=&startDate=

	const onFormSubmit = async searchterm => {
		setIsLoading(true);
		const response = await axios.get(
			`https://cors-anywhere.herokuapp.com/https://api.kill-board.com/battles/?page=0&limit=100&search=${searchterm}&group=&startDate=`
		);
		setBattles(response.data);
		setIsLoading(false);
	};
	const loadingHandler = () => setIsLoading(false);
	return (
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
	);
};

export default App;
