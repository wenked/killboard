import React from 'react';
import axios from 'axios';
import { Container, Loader } from 'semantic-ui-react';
import _ from 'lodash';
import BattleContext from '../../context/BattleContext';
import Players from '../Players';
import ZergComposition from '../ZergComposition';
import items from '../items';
import Guilds from '../Guilds';
import './KillboardList.css';
import '../../styles/main.css';
import { CSSTransition } from 'react-transition-group';
import {
	MeleeDpsArray as MeleeDps,
	TankArray as Tank,
	SupportArray as Support,
	HealerArray as Healer,
	RangedDpsArray as RangedDps,
} from '../../utils/zergData';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Handholding from '../Handholding';

const organizeItems = (obj, item) => {
	if (item.LocalizedNames !== null) {
		return Object.assign(obj, {
			[item.UniqueName]: item.LocalizedNames['EN-US'],
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
	if (guild === '' || null) {
		return 'No Guild';
	}
	return guild;
};

const containerVariants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: { delay: 0.5, duration: 0.5 },
	},
	exit: {
		opacity: 0,
	},
};

// https://api.kill-board.com/battles/94225686

const BattleDetail = () => {
	const { battleId } = useParams();
	const battleContext = React.useContext(BattleContext);
	/*const selectedBattleWithContext = battleContext.battles.find(
		battle => battle.id === parseInt(battleId)
	);*/
	const [selectedBattle, setSelectedBattle] = React.useState({});
	const [showZergComposition, setShowZergComposition] = React.useState(false);
	const [isLoading, setLoading] = React.useState(true);
	const [kbLoading, setKbLoading] = React.useState(true);
	const [showGuilds, setShowGuilds] = React.useState(false);
	const [zergs, setZergs] = React.useState({});

	//https://albionboard.azurewebsites.net/battle/90885561?handler=BattleJson
	const getKillboardWithId = React.useCallback(
		async id => {
			const response = await axios.get(
				`https://cors-anywhere.herokuapp.com/https://api.kill-board.com/battles/${id}`
			);

			setSelectedBattle(response.data);
			setKbLoading(false);
		},
		[setSelectedBattle, setKbLoading]
	);

	const getPlayerWeaponInfo = React.useCallback(async () => {
		const response = await axios.get(
			`https://cors-anywhere.herokuapp.com/https://albionboard.azurewebsites.net/battle/${battleId}?handler=BattleJson`
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

		const playersWithRightItemsNames = playersInfo.map(a => {
			return { ...a, weapon: normalNameItems[a.weapon] };
		});

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

		setZergs(guildGroupSort);
		setLoading(false);
	}, [battleId]);

	React.useEffect(() => {
		getKillboardWithId(battleId);
		battleContext.loading();
		getPlayerWeaponInfo();
	}, [getPlayerWeaponInfo, battleId, getKillboardWithId, battleContext]);

	return kbLoading ? (
		<AnimatePresence exitBeforeEnter>
			<motion.div
				variants={containerVariants}
				initial='hidden'
				animate='visible'
				exit='exit'
			>
				<Loader size='big' active inverted>
					Loading...
				</Loader>
			</motion.div>
		</AnimatePresence>
	) : (
		<motion.div
			variants={containerVariants}
			initial='hidden'
			animate='visible'
			exit='exit'
		>
			<Container className='m-4 p-4'>
				<div className='text-orange-1000 text-4xl text-center font-bold pb-3'>
					ID: {selectedBattle.id}
				</div>
				<div className='text-gray-1000 text-2xl text-center font-bold pb-2'>
					Total Players:{selectedBattle.totalPlayers} Total Kills:
					{'     '}
					{selectedBattle.totalKills} Total Fame:{'      '}
					{selectedBattle.totalFame}
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
					<ZergComposition guildzergs={zergs} />
				</CSSTransition>
				<div className='py-5'>
					<button
						onClick={() => setShowGuilds(!showGuilds)}
						className='bg-orange-1000 text-gray-1000 hover:bg-gray-100 hover:text-orange-1000 font-bold py-3 px-4 rounded flex'
					>
						Handhold Formation
					</button>

					<CSSTransition
						in={showGuilds}
						timeout={300}
						classNames='transition'
						unmountOnExit={true}
					>
						<Handholding
							guilds={selectedBattle.guilds}
							winners={selectedBattle.winners}
							losers={selectedBattle.losers}
						/>
					</CSSTransition>
				</div>
			</Container>
			<br />
			<br />
			<div className='grid grid-cols-2 grid-rows-1 px-10'>
				<Container>
					<div className='text-orange-1000 text-4xl text-left font-bold'>
						Winners
					</div>
				</Container>
				<Container>
					<div className='text-gray-1000 text-4xl text-right font-bold'>
						Losers
					</div>
				</Container>
			</div>
			<div className='tablegrid'>
				<Guilds result='winner' guilds={selectedBattle.winners.guilds} />
				<Guilds result='loser' guilds={selectedBattle.losers.guilds} />
				<Players
					players={selectedBattle.winners.players}
					battleresult={'winner'}
				/>
				<Players
					players={selectedBattle.losers.players}
					battleresult={'loser'}
				/>
			</div>
		</motion.div>
	);
};

export default BattleDetail;