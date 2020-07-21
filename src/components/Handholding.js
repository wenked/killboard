import React from 'react';
import Guilds from './Guilds';
import ModalGraph from './ModalGraph';
import Team from './Team';
import { motion } from 'framer-motion';

const reducer = (accumulator, currentValue) => accumulator + currentValue;

const teamReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_GUILD':
			if (
				!action.otherTeam.includes(action.team) &&
				!state.includes(action.team)
			) {
				return [...state, action.team];
			}
			return [...state];
		case 'REMOVE_GUILD':
			return state.filter((selected) => selected.name !== action.guildName);
		default:
			return state;
	}
};

const buttonVariants = {
	visible: {
		transition: { type: 'spring', stiffness: 300 },
	},
	hover: {
		scale: 1.3,
	},
};

const Handholding = ({ guilds }) => {
	const [teamA, dispatchA] = React.useReducer(teamReducer, []);
	const [teamB, dispatchB] = React.useReducer(teamReducer, []);
	const [showTable, setShowTable] = React.useState(false);
	const resultA =
		teamA.length !== 0 && teamA.map((el) => el.killFame).reduce(reducer);
	const resultB =
		teamB.length !== 0 && teamB.map((el) => el.killFame).reduce(reducer);

	const guildsMap = guilds.map((guild, i) => {
		return (
			<div key={i} className='font-bold text-orange-1000 block'>
				<div>
					<div>{guild.name}</div>
					<motion.button
						variants={buttonVariants}
						whileHover='hover'
						transition='visible'
						onClick={() =>
							dispatchA({ type: 'ADD_GUILD', otherTeam: teamB, team: guild })
						}
						className='mx-2 text-gray-1000 font-bold'>
						Team A
					</motion.button>
					<motion.button
						variants={buttonVariants}
						whileHover='hover'
						transition='visible'
						onClick={() =>
							dispatchB({ type: 'ADD_GUILD', otherTeam: teamA, team: guild })
						}
						className='mx-2 text-gray-1000 font-bold'>
						Team B
					</motion.button>
				</div>
			</div>
		);
	});

	return (
		<>
			<div className='grid gap-3 grid-cols-2 py-4'>
				<div>{guildsMap}</div>
				<div>
					<div className='font-bold text-orange-1000'>
						Team A: <Team team={teamA} dispatch={dispatchA} />
						<div className='inline-block'>
							Total Fame:{' '}
							<span className='text-gray-1000'>
								{teamA.length !== 0 &&
									teamA.map((el) => el.killFame).reduce(reducer)}
							</span>
						</div>
					</div>
					<div className='font-bold text-orange-1000 '>
						Team B: <Team team={teamB} dispatch={dispatchB} />
						<div className='inline-block'>
							Total Fame:{' '}
							<span className='text-gray-1000'>
								{teamB.length !== 0 &&
									teamB.map((el) => el.killFame).reduce(reducer)}
							</span>
						</div>
					</div>
					<div>
						<button
							className='bg-orange-1000 text-gray-1000 hover:bg-gray-100 hover:text-orange-1000 font-bold py-3 px-4 rounded flex'
							onClick={() => setShowTable(!showTable)}>
							Apply
						</button>
						{showTable ? (
							<ModalGraph size='big' closeModal={() => setShowTable(false)}>
								<div className='grid gap-3 grid-cols-2 py-4'>
									{resultA > resultB ? (
										<>
											<div>
												<div className='pb-4 text-orange-1000 font-bold text-2xl'>
													Winners
												</div>
												<Guilds
													result='winner'
													guilds={teamA.sort(
														(guildA, guildB) =>
															guildB.killFame - guildA.killFame
													)}
												/>
											</div>
											<div>
												<div className='pb-4 text-gray-1000 font-bold text-2xl'>
													Losers
												</div>
												<Guilds
													result='loser'
													guilds={teamB.sort(
														(guildA, guildB) =>
															guildB.killFame - guildA.killFame
													)}
												/>
											</div>
										</>
									) : (
										<>
											<div>
												<div className='pb-4 text-orange-1000 font-bold text-2xl'>
													Winners
												</div>
												<Guilds
													result='winner'
													guilds={teamB.sort(
														(guildA, guildB) =>
															guildB.killFame - guildA.killFame
													)}
												/>
											</div>
											<div>
												<div className='pb-4 text-gray-1000 font-bold text-2xl'>
													Losers
												</div>
												<Guilds
													result='loser'
													guilds={teamA.sort(
														(guildA, guildB) =>
															guildB.killFame - guildA.killFame
													)}
												/>
											</div>
										</>
									)}
								</div>
							</ModalGraph>
						) : null}
					</div>
				</div>
			</div>
		</>
	);
};

export default Handholding;
