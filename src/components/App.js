import React from 'react';
import axios from 'axios';
import { Loader, Header } from 'semantic-ui-react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import BattleDetail from './BattleDetail';
import SearchBar from './SearchBar';
import KillboardList from './KillboardList';
import BattleContext from '../context/BattleContext';
import './KillboardList.css';

const App = () => {
	const [Battles, setBattles] = React.useState([]);
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

	const onFormSubmit = async (searchterm) => {
		setIsLoading(true);
		const cors = 'https://cors-anywhere.herokuapp.com/';
		const response = await axios.get(
			`${cors}https://api.kill-board.com/battles/?page=0&limit=50&search=${searchterm}&group=&startDate=`
		);
		console.log(response.data);

		setBattles(response.data);
		setIsLoading(false);
		setShowBattleList(true);
	};

	const selectBattleHandler = (battle) => {
		setBattleID(battle.id);
		setShowBattleList(false);
		setSelectedBattle((e) => ({ ...e, ...battle }));
	};

	return (
		<Router>
			<BattleContext.Provider
				value={{
					selectBattleHandler: selectBattleHandler,
					selectBattle: selectedBattle,
					battleID: battleID,
					battles: Battles,
				}}
			>
				<div className='killboardheader'>
					<Link to='/'>
						<Header inverted='true'>Killboard</Header>
					</Link>
				</div>
				<SearchBar SubmitFunction={onFormSubmit} />
				<Switch>
					<Route path='/' exact component={KillboardList} />
					<Route path={`/${battleID}`} exact component={BattleDetail} />
				</Switch>
				{isLoading ? (
					<Loader size='big' active='true' inverted='true'>
						Loading...
					</Loader>
				) : showBattleList ? (
					<KillboardList />
				) : null}
			</BattleContext.Provider>
		</Router>
	);
};

export default App;
