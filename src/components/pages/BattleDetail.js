import React from 'react';
import axios from 'axios';
import { Loader } from 'semantic-ui-react';
import _ from 'lodash';
//import BattleContext from '../../context/BattleContext';
import Players from '../Players';
import ZergComposition from '../ZergComposition';
import Guilds from '../Guilds';
import objItems from '../../utils/objItems';
import './KillboardList.css';
import '../../styles/main.css';
import { CSSTransition } from 'react-transition-group';
import { handleguild, getRole } from '../../utils/zergData';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Handholding from '../Handholding';
import { useQuery } from 'react-query';

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

const fetchBattle = async battleid => {
	const response = await axios.get(
		`https://cors-anywhere.herokuapp.com/https://api.kill-board.com/battles/${battleid}`
	);

	return response.data;
};

const BattleDetail = () => {
	const { battleId } = useParams();

	/*const dataWithContext = battleContext.battles.find(
		battle => battle.id === parseInt(battleId)
	);*/
	//const [data, setdata] = React.useState({});
	const [showZergComposition, setShowZergComposition] = React.useState(false);
	const [isLoadingInfo, setLoading] = React.useState(true);
	const [showGuilds, setShowGuilds] = React.useState(false);
	const [zergs, setZergs] = React.useState(null);

	const { isLoading, data, error } = useQuery(battleId, fetchBattle);

	//https://albionboard.azurewebsites.net/battle/90885561?handler=BattleJson

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

		const noFilterPlayersInfo = killData.flat();

		const playersInfo = Array.from(
			new Set(noFilterPlayersInfo.map(a => a.name))
		).map(name => {
			return noFilterPlayersInfo.find(a => a.name === name);
		});

		const playersWithRightItemsNames = playersInfo.map(a => {
			return { ...a, weapon: objItems[a.weapon] };
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
		//getKillboardWithId(battleId);

		//battleContext.loading();
		getPlayerWeaponInfo();
	}, [getPlayerWeaponInfo, battleId]);

	return isLoading ? (
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
			<div className='m-4 p-4 shadow-2xl w-full'>
				<div className='text-orange-1000 text-4xl text-center font-bold pb-3'>
					ID: {data.id}
				</div>
				<div className='text-gray-1000 text-2xl text-center font-bold pb-2'>
					Total Players:{data.totalPlayers} Total Kills:
					{'     '}
					{data.totalKills} Total Fame:{'      '}
					{data.totalFame}
				</div>
				<div className='pt-4'>
					{!isLoadingInfo ? (
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
						{zergs && <ZergComposition guildzergs={zergs} />}
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
								guilds={data.guilds}
								winners={data.winners}
								losers={data.losers}
							/>
						</CSSTransition>
					</div>
				</div>
			</div>

			<div className='p-4 m-4 block md:block  lg:grid gap-2 grid-cols-2'>
				<div className='py-2'>
					<div className='pb-4 text-orange-1000 text-4xl text-left font-bold'>
						Winners
					</div>
					<Guilds result='winner' guilds={data.winners.guilds} />
				</div>
				<div className='py-2'>
					<div className='pb-4 text-gray-1000 text-4xl text-right font-bold sm:pl-8'>
						Losers
					</div>
					<Guilds result='loser' guilds={data.losers.guilds} />
				</div>
				<div className='py-2'>
					<Players players={data.winners.players} battleresult={'winner'} />
				</div>
				<div className='py-2'>
					<Players players={data.losers.players} battleresult={'loser'} />
				</div>
			</div>
		</motion.div>
	);
};

export default BattleDetail;
