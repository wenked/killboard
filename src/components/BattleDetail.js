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
import { CSSTransition } from 'react-transition-group';

const Tank = [
	'Mace',
	'Heavy Mace',
	'Morning Star',
	'Bedrock Mace',
	'Incubus Mace',
	'Camlann Mace',
	'Hammer',
	'Polehammer',
	'Great Hammer',
	'Tombhammer',
	'Forge Hammers',
	'Grovekeeper',
	'Quarterstaff',
	'Iron-Clad Staff',
	'Double Bladed Staff',
	'Black Monk Stave',
	'Soulscythe',
	'Staff of Balance',
];

const Healer = [
	'Great Holy Staff',
	'Divine Staff',
	'Lifetouch Staff',
	'Fallen Staff',
	'Redemption Staff',
	'Nature Staff',
	'Great Nature Staff',
	'Wild Staff',
	'Druidic Staff',
	'Blight Staff',
	'Rampant Staff',
];

const Support = [
	'Arcane Staff',
	'Great Arcane Staff',
	'Enigmatic Staff',
	'Witchwork Staff',
	'Occult Staff',
	'Malevolent Locus',
	'Icicle Staff',
];

const RangedDps = [
	'Permafrost Prism',
	'Frost Staff',
	'Great Frost Staff',
	'Glacial Staff',
	'Hoarfrost Staff',
	'Cursed Staff',
	'Great Cursed Staff',
	'Demonic Staff',
	'Lifecurse Staff',
	'Cursed Skull',
	'Damnation Staff',
	'Fire Staff',
	'Great Fire Staff',
	'Infernal Staff',
	'Wildfire Staff',
	'Brimstone Staff',
	'Blazing Staff',
	'Bow',
	'Warbow',
	'Longbow',
	'Whispering Bow',
	'Wailing Bow',
	'Bow of Badon',
	'Heavy Crossbow',
	'Crossbow',
	'Light Crossbow',
	'Weeping Repeater',
	'Boltcasters',
	'Siegebow',
];

const MeleeDps = [
	'Pike',
	'Glaive',
	'Heron Spear',
	'Spirithunter',
	'Trinity Spear',
	'Dagger',
	'Dagger Pair',
	'Claws',
	'Bloodletter',
	'Black hands',
	'Deathgivers',
	'Greataxe',
	'Battleaxe',
	'Halberd',
	'Carrioncaller',
	'Infernal Scythe',
	'Bear Paws',
	'Broadsword',
	'Claymore',
	'Dual Swords',
	'Clarent Blade',
	'Carving Sword',
	'Galatine Pair',
];
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

const getRole = string => {
	if (Tank.includes(string) === true) {
		return 'Tank';
	}
	if (Healer.includes(string) === true) {
		return 'Healer';
	}
	if (Support.includes(string) === true) {
		return 'Support';
	}
	if (RangedDps.includes(string) === true) {
		return 'Ranged Dps';
	}
	if (MeleeDps.includes(string) === true) {
		return 'Melee Dps';
	}
	return 'nda';
};

const handleguild = guild => {
	if (guild === '') {
		return 'No Guild';
	}
	return guild;
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

	const [playerWithItem, setPlayerWithItem] = React.useState({});
	const [isLoading, setLoading] = React.useState(true);
	const [zergs, setZergs] = React.useState({});

	//https://albionboard.azurewebsites.net/battle/90885561?handler=BattleJson

	const getPlayerWeaponInfo = React.useCallback(async () => {
		const cors = 'https://cors-anywhere.herokuapp.com/';

		/*const response2 = await axios.get(
			`${cors}https://handholdreport.com/api/killboard/${battleContext.selectBattle.id}`
		);
		console.log(
			_.map(
				battleContext.selectBattle.players,
				player => response2.data.players[player.id].weapon
			)
		);
		console.log(response2);
		const hhreportplayers = response2.data.players;
		console.log(
			_.map(
				battleContext.selectBattle.players,
				player =>
					normalNameItems[hhreportplayers[player.id].weapon.split(/[?]/)[0]]
			)
		);
		const HHreportPlayerRightItens = _.map(response2.data.players, players => ({
			...players,
			weapon: normalNameItems[players.weapon.split(/[?]/)[0]],
		}));
		console.log(HHreportPlayerRightItens);

		console.log(response2, 'handholdreportapi');*/

		const response = await axios.get(
			`https://cors-anywhere.herokuapp.com/https://albionboard.azurewebsites.net/battle/${battleContext.selectBattle.id}?handler=BattleJson`
		);

		const killData = response.data.kills.map(eventkill =>
			eventkill.groupMembers.map(member => {
				if (member.equipment.MainHand === null) {
					return {
						name: member.name,
						guild: handleguild(member.guildName),
						weapon: 'no weapon',
					};
				}
				return {
					name: member.name,
					guild: handleguild(member.guildName),
					weapon: member.equipment.MainHand.type,
				};
			})
		);
		const normalNameItems = items.reduce(organizeItems, {});

		const noFilterPlayersInfo = killData.flat();

		const playersInfo = Array.from(
			new Set(noFilterPlayersInfo.map(a => a.name))
		).map(name => {
			return noFilterPlayersInfo.find(a => a.name === name);
		});

		console.log(playersInfo);

		const playersWithRightItemsNames = playersInfo.map(a => {
			return { ...a, weapon: normalNameItems[a.weapon] };
		});
		console.log(playersWithRightItemsNames);
		setplayerWeaponInfo(playersWithRightItemsNames);
		const noTierItems = playersWithRightItemsNames.map(a => {
			return {
				...a,
				weapon:
					a.weapon !== undefined &&
					a.weapon.substring(a.weapon.indexOf(' ') + 1, a.weapon.length),
				role:
					a.weapon !== undefined &&
					getRole(
						a.weapon.substring(a.weapon.indexOf(' ') + 1, a.weapon.length)
					),
			};
		});

		const guildGroupSort = _.groupBy(noTierItems, a => a.guild);
		console.log(guildGroupSort, 'koe');

		const playerWithitems = playersWithRightItemsNames.reduce(
			organizePlayer,
			{}
		);

		setPlayerWithItem(playerWithitems);

		setZergs(guildGroupSort);

		setLoading(false);
	}, [battleContext.selectBattle.id]);

	React.useEffect(() => {
		getPlayerWeaponInfo();
	}, [getPlayerWeaponInfo]);

	return (
		<div>
			<Container style={mystyle}>
				<div className='idInfoFont'>ID: {battleContext.selectBattle.id}</div>
				<div className='headerInfoFont pb-2'>
					Total Players:{battleContext.selectBattle.totalPlayers} Total Kills:
					{'     '}
					{battleContext.selectBattle.totalKills} Total Fame:{'      '}
					{battleContext.selectBattle.totalFame}
				</div>
				{!isLoading ? (
					<button
						className='bg-orange-1000 text-gray-1000 hover:bg-gray-100 hover:text-orange-1000 font-bold py-3 px-4 rounded flex'
						onClick={() => {
							setShowZergComposition(!showZergComposition);
						}}
					>
						Show Zergs Composition
					</button>
				) : (
					<button className='bg-orange-1000 text-gray-1000 hover:bg-gray-100 hover:text-orange-1000 font-bold py-3 px-4 rounded opacity-50 flex cursor-not-allowed'>
						Loading...
					</button>
				)}

				<CSSTransition
					in={showZergComposition}
					timeout={300}
					classNames='transition'
					unmountOnExit={true}
				>
					<ZergComposition
						playerwithitem={playerWithItem}
						rawplayerinfo={playerWeaponInfo}
						guildzergs={zergs}
						showZerg={showZergComposition}
					/>
				</CSSTransition>
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
