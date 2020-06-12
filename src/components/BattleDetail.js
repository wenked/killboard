import React from 'react';
import axios from 'axios';
import { Table, Container } from 'semantic-ui-react';
import _ from 'lodash';
import BattleContext from '../context/BattleContext';
import WinnerPlayer from './WinnerPlayers';
import LoserPlayers from './LoserPlayers';
import ZergComposition from './ZergComposition';
import items from './items';
import './KillboardList.css';
import '../styles/main.css';

const organizeItems = (obj, item) => {
	if (item.LocalizedNames !== null) {
		return Object.assign(obj, {
			[item.UniqueName]: item.LocalizedNames['EN-US'],
		});
	}

	return Object.assign(obj, { nada: 'nada' });
};

const organizePlayer = (obj, item) => {
	if (item.LocalizedNames !== null) {
		return Object.assign(obj, {
			[item.name]: item.weapon,
		});
	}
	return Object.assign(obj, { nada: 'nada' });
};

const BattleDetail = props => {
	const battleContext = React.useContext(BattleContext);
	const Winners = battleContext.selectBattle.winners.guilds;
	const Losers = battleContext.selectBattle.losers.guilds;
	const [playerWeaponInfo, setplayerWeaponInfo] = React.useState([]);
	const mystyle = {
		margin: '10px',
		padding: '10px',
	};
	const [showZergComposition, setShowZergComposition] = React.useState(false);
	const [itemState, setItemState] = React.useState({});
	const [playerWithItem, setPlayerWithItem] = React.useState({});
	const [isLoading, setLoading] = React.useState(true);
	const [zergs, setZergs] = React.useState([]);

	//https://albionboard.azurewebsites.net/battle/90885561?handler=BattleJson

	/*
	 items[0].LocalizationNameVariable
	 items[0].LocalizedNames.EN-US


	 playerWeaponInfo.weapon === items.LocalizationNameVariable
	 {...a,weapon: items.LocalizationNameVariable}

	 */

	const getPlayerWeaponInfo = React.useCallback(async () => {
		const cors = 'https://cors-anywhere.herokuapp.com/';
		/*console.log(battleContext, 'context');
		const response2 = await axios.get(
			`${cors}https://handholdreport.com/api/killboard/${battleContext.selectBattle.id}`
		);
		console.log(
			_.map(
				battleContext.selectBattle.players,
				player => response2.data.players[player.id].weapon
			)
		);
		console.log(response2, 'handholdreportapi');*/
		const response = await axios.get(
			`${cors}https://albionboard.azurewebsites.net/battle/${battleContext.selectBattle.id}?handler=BattleJson`
		);
		console.log(response.data, 'aqui xd');
		console.log(response.data.kills, 'aqui');

		const killData = response.data.kills.map(eventkill =>
			eventkill.groupMembers.map(member => {
				if (member.equipment.MainHand === null) {
					return {
						name: member.name,
					};
				}
				return {
					name: member.name,
					guild: member.guildName,
					weapon: member.equipment.MainHand.type,
				};
			})
		);
		const normalNameItems = items.reduce(organizeItems, {});
		setItemState(normalNameItems);

		const noFilterPlayersInfo = killData.flat();
		//console.log(noFilterPlayersInfo);
		const playersInfo = Array.from(
			new Set(noFilterPlayersInfo.map(a => a.name))
		).map(name => {
			return noFilterPlayersInfo.find(a => a.name === name);
		});

		const playersWithRightItemsNames = playersInfo.map(a => {
			return { ...a, weapon: normalNameItems[a.weapon] };
		});
		setplayerWeaponInfo(playersWithRightItemsNames);
		const noTierItems = playersWithRightItemsNames.map(a => {
			return {
				...a,
				weapon:
					a.weapon !== undefined &&
					a.weapon.substring(a.weapon.indexOf(' ') + 1, a.weapon.length),
			};
		});
		const guildGroupSort = _.groupBy(noTierItems, a => a.guild);

		const myGuildsKeys = Object.keys(guildGroupSort);

		const weaponSort = _.map(myGuildsKeys, guild =>
			_.groupBy(guildGroupSort[guild], a => a.weapon)
		);
		console.log(weaponSort, 'weaponsort');

		const myZergs = _.map(myGuildsKeys, (guild, i) => {
			return { [guild]: weaponSort[i] };
		});

		const test = _.map(myZergs, guild => Object.keys(guild));
		console.log(test);
		console.log(myZergs, 'finalmente');
		//console.log(playersWithRightItemsNames, 'teste');
		const playerWithitems = playersWithRightItemsNames.reduce(
			organizePlayer,
			{}
		);
		setZergs(myZergs);
		setPlayerWithItem(playerWithitems);

		setLoading(false);
	}, [battleContext.selectBattle.id]);

	React.useEffect(() => {
		getPlayerWeaponInfo();
	}, [battleContext, getPlayerWeaponInfo]);

	return (
		<div>
			<Container style={mystyle}>
				<div className='idInfoFont'>ID: {battleContext.selectBattle.id}</div>
				<div className='headerInfoFont'>
					Total Players:{battleContext.selectBattle.totalPlayers} Total Kills:
					{'     '}
					{battleContext.selectBattle.totalKills} Total Fame:{'      '}
					{battleContext.selectBattle.totalFame}
				</div>
				{!isLoading ? (
					<button
						className='bg-orange-1000 text-gray-1000 hover:bg-gray-100 hover:text-orange-1000 font-bold py-2 px-4 rounded flex'
						onClick={() => {
							setShowZergComposition(!showZergComposition);
						}}
					>
						Show Zerg Composition
					</button>
				) : (
					<button className='bg-orange-1000 text-gray-1000 hover:bg-gray-100 hover:text-orange-1000 font-bold py-2 px-4 rounded opacity-50 flex cursor-not-allowed'>
						Loading...
					</button>
				)}
				{showZergComposition ? (
					<ZergComposition
						items={itemState}
						playerwithitem={playerWithItem}
						rawplayerinfo={playerWeaponInfo}
						guildzergs={zergs}
					/>
				) : null}
			</Container>
			<br />
			<br />
			<div className='gridheaders'>
				<Container>
					<div className='headerWfont'>Winners</div>
				</Container>
				<Container>
					<div className='headerLfont'>Losers</div>
				</Container>
			</div>
			<div className='tablegrid'>
				<Table size='small' inverted='true' className='loserTable'>
					<Table.Header className='loserTable'>
						<Table.Row>
							<Table.HeaderCell>Alliance</Table.HeaderCell>
							<Table.HeaderCell>Guild</Table.HeaderCell>
							<Table.HeaderCell>Players</Table.HeaderCell>
							<Table.HeaderCell>Kills</Table.HeaderCell>
							<Table.HeaderCell>Deaths</Table.HeaderCell>
							<Table.HeaderCell>Kill Fame</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{Winners.map(winner => (
							<React.Fragment>
								<Table.Row>
									<Table.Cell>{winner.alliance}</Table.Cell>
									<Table.Cell>{winner.name}</Table.Cell>
									<Table.Cell>{winner.totalPlayers}</Table.Cell>
									<Table.Cell>{winner.kills}</Table.Cell>
									<Table.Cell>{winner.deaths}</Table.Cell>
									<Table.Cell>{winner.killFame}</Table.Cell>
								</Table.Row>
							</React.Fragment>
						))}
					</Table.Body>
				</Table>

				<Table size='small' inverted='true' className='tableList'>
					<Table.Header className='tableList'>
						<Table.Row>
							<Table.HeaderCell>Alliance</Table.HeaderCell>
							<Table.HeaderCell>Guild</Table.HeaderCell>
							<Table.HeaderCell>Players</Table.HeaderCell>
							<Table.HeaderCell>Kills</Table.HeaderCell>
							<Table.HeaderCell>Deaths</Table.HeaderCell>
							<Table.HeaderCell>Kill Fame</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{Losers.map(winner => (
							<React.Fragment>
								<Table.Row>
									<Table.Cell>{winner.alliance}</Table.Cell>
									<Table.Cell>{winner.name}</Table.Cell>
									<Table.Cell>{winner.totalPlayers}</Table.Cell>
									<Table.Cell>{winner.kills}</Table.Cell>
									<Table.Cell>{winner.deaths}</Table.Cell>
									<Table.Cell>{winner.killFame}</Table.Cell>
								</Table.Row>
							</React.Fragment>
						))}
					</Table.Body>
				</Table>

				<WinnerPlayer weaponinfo={playerWithItem} loading={isLoading} />

				<LoserPlayers weaponinfo={playerWithItem} loading={isLoading} />
			</div>
		</div>
	);
};

export default BattleDetail;
