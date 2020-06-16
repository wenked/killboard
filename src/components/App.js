import React from 'react';
import axios from 'axios';
import { Loader } from 'semantic-ui-react';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchBar from './SearchBar';
import Layout from './Layout';
import KillboardList from './KillboardList';
import BattleContext from '../context/BattleContext';
import './KillboardList.css';
import Routes from './Routes';

const App = () => {
	const [battles, setBattles] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [showBattleList, setShowBattleList] = React.useState(false);
	const [battleID, setBattleID] = React.useState(null);
	const [selectedBattle, setSelectedBattle] = React.useState({
		alliances: [],
		battle_TIMEOUT: '',
		endTime: '',
		guilds: [],
		id: '',
		losers: [],
		players: [],
		retrieved: '',
		startTime: '',
		timeout: '',
		totalFame: '',
		totalKills: '',
		totalPlayers: '',
		winners: [],
	});

	//https://api.kill-board.com/battles/?page=0&limit=50&search=Elevate&group=&startDate=

	const onFormSubmit = async searchterm => {
		setIsLoading(true);
		const cors = 'https://cors-anywhere.herokuapp.com/';
		const response = await axios.get(
			`https://cors-anywhere.herokuapp.com/https://api.kill-board.com/battles/?page=0&limit=100&search=${searchterm}&group=&startDate=`
		);

		setBattles(response.data);
		setIsLoading(false);
		//setShowBattleList(true);
	};

	const selectBattleHandler = battleid => {
		setBattleID(battleid);

		setShowBattleList(false);
		const selected = battles.filter(e => e.id === battleid);

		setSelectedBattle(e => ({ ...e, ...selected[0] }));
	};

	const loadingHandler = () => setIsLoading(false);

	return (
		<Router>
			<BattleContext.Provider
				value={{
					selectBattleHandler: selectBattleHandler,
					selectBattle: selectedBattle,
					battleID: battleID,
					battles: battles,
					loading: loadingHandler,
				}}
			>
				<Layout>
					<SearchBar SubmitFunction={onFormSubmit} />
					<Routes battleid={battleID} />
					{isLoading ? (
						<Loader size='big' active='true' inverted='true'>
							Loading...
						</Loader>
					) : showBattleList ? (
						<KillboardList />
					) : null}
				</Layout>
			</BattleContext.Provider>
		</Router>
	);
};

export default App;
