import React from 'react';
import { Loader } from 'semantic-ui-react';
import Players from '../Players';
import ZergComposition from '../ZergComposition';
import Guilds from '../Guilds';
import './KillboardList.css';
import '../../styles/main.css';
import { CSSTransition } from 'react-transition-group';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Handholding from '../Handholding';
import { useQuery } from 'react-query';
import { request } from 'graphql-request';
import { queryBattleDetail } from '../../utils/queries';

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

const fetcher = async (query, variables) => {
	const fetch = await request(
		'https://ablionapigraphql.herokuapp.com/graphql',
		query,
		variables
	);
	return fetch;
};

const BattleDetail = () => {
	const { battleId } = useParams();
	const variables = { id: parseInt(battleId) };
	const { data, isLoading, isError } = useQuery(
		[queryBattleDetail, variables],
		fetcher
	);
	const [showZergComposition, setShowZergComposition] = React.useState(false);
	const [showGuilds, setShowGuilds] = React.useState(false);

	return isLoading ? (
		<AnimatePresence exitBeforeEnter>
			<motion.div
				variants={containerVariants}
				initial='hidden'
				animate='visible'
				exit='exit'>
				<Loader size='big' active inverted>
					Loading...
				</Loader>
			</motion.div>
		</AnimatePresence>
	) : isError ? (
		<span className='text-gray-1000 font-bold'>Failed to fetch data</span>
	) : (
		<motion.div
			variants={containerVariants}
			initial='hidden'
			animate='visible'
			exit='exit'>
			<div className='m-4 p-4 shadow-2xl w-full'>
				<div className='text-orange-1000 text-4xl text-center font-bold pb-3'>
					ID: {data.battleById.battleId}
				</div>
				<div className='text-gray-1000 text-2xl text-center font-bold pb-2'>
					Total Players:{data.battleById.totalPlayers} Total Kills:
					{'     '}
					{data.battleById.totalKills} Total Fame:{'      '}
					{data.battleById.totalFame}
				</div>
				<div className='pt-4'>
					<button
						className='bg-orange-1000 text-gray-1000 hover:bg-gray-100 hover:text-orange-1000 font-bold py-3 px-4 rounded flex'
						onClick={() => {
							setShowZergComposition(!showZergComposition);
						}}>
						Show Zergs Composition
					</button>

					<CSSTransition
						in={showZergComposition}
						timeout={300}
						classNames='transition'
						unmountOnExit={true}>
						{<ZergComposition guilds={data.battleById.guilds} />}
					</CSSTransition>
					<div className='py-5'>
						<button
							onClick={() => setShowGuilds(!showGuilds)}
							className='bg-orange-1000 text-gray-1000 hover:bg-gray-100 hover:text-orange-1000 font-bold py-3 px-4 rounded flex'>
							Handhold Formation
						</button>

						<CSSTransition
							in={showGuilds}
							timeout={300}
							classNames='transition'
							unmountOnExit={true}>
							<Handholding
								guilds={data.battleById.guilds}
								winners={data.battleById.winners}
								losers={data.battleById.losers}
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
					<Guilds result='winner' guilds={data.battleById.winners.guilds} />
				</div>
				<div className='py-2'>
					<div className='pb-4 text-gray-1000 text-4xl text-right font-bold sm:pl-8'>
						Losers
					</div>
					<Guilds result='loser' guilds={data.battleById.losers.guilds} />
				</div>
				<div className='py-2'>
					<Players
						players={data.battleById.winners.players}
						battleresult={'winner'}
					/>
				</div>
				<div className='py-2'>
					<Players
						players={data.battleById.losers.players}
						battleresult={'loser'}
					/>
				</div>
			</div>
		</motion.div>
	);
};

export default BattleDetail;
