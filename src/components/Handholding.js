import React from 'react';
import Guilds from './Guilds';
import ModalGraph from './ModalGraph';
import Team from './Team';
import { motion } from 'framer-motion';

const reducer = (accumulator, currentValue) => accumulator + currentValue;

const buttonVariants = {
	visible: {
		transition: { type: 'spring', stiffness: 300 },
	},
	hover: {
		scale: 1.3,
	},
};

const Handholding = ({ guilds }) => {
	const [teamA, setTeamA] = React.useState([]);
	const [teamB, setTeamB] = React.useState([]);
	const [showTable, setShowTable] = React.useState(false);

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
							setTeamA(guilds => {
								if (!teamB.includes(guild) && !teamA.includes(guild)) {
									return [...guilds, guild];
								}
								return [...guilds];
							})
						}
						className='mx-2 text-gray-1000'
					>
						Team A
					</motion.button>
					<motion.button
						variants={buttonVariants}
						whileHover='hover'
						transition='visible'
						onClick={() =>
							setTeamB(guilds => {
								if (!teamA.includes(guild) && !teamB.includes(guild)) {
									return [...guilds, guild];
								}
								return [...guilds];
							})
						}
						className='mx-2 text-gray-1000'
					>
						Team B
					</motion.button>
				</div>
			</div>
		);
	});

	const resultA =
		teamA.length !== 0 && teamA.map(el => el.score).reduce(reducer);
	const resultB =
		teamB.length !== 0 && teamB.map(el => el.score).reduce(reducer);

	return (
		<>
			<div className='grid gap-3 grid-cols-2'>
				<div>{guildsMap}</div>
				<div>
					<div className='font-bold text-orange-1000'>
						Team A: <Team team={teamA} setTeam={setTeamA} />
						<div className='inline-block'>
							Total Fame:{' '}
							<span className='text-gray-1000'>
								{teamA.length !== 0 &&
									teamA.map(el => el.score).reduce(reducer)}
							</span>
						</div>
					</div>
					<div className='font-bold text-orange-1000 '>
						Team B: <Team team={teamB} setTeam={setTeamB} />
						<div className='inline-block'>
							Total Fame:{' '}
							<span className='text-gray-1000'>
								{teamB.length !== 0 &&
									teamB.map(el => el.score).reduce(reducer)}
							</span>
						</div>
					</div>
					<div>
						<button
							className='bg-orange-1000 text-gray-1000 hover:bg-gray-100 hover:text-orange-1000 font-bold py-3 px-4 rounded flex'
							onClick={() => setShowTable(!showTable)}
						>
							Apply
						</button>
						{showTable ? (
							<ModalGraph size='big' closeModal={() => setShowTable(false)}>
								<div className='grid gap-3 grid-cols-2 py-4'>
									{resultA > resultB ? (
										<>
											<div>
												<div className='text-orange-1000 font-bold text-2xl'>
													Winners
												</div>
												<Guilds
													result='winner'
													guilds={teamA.sort(
														(guildA, guildB) => guildB.score - guildA.score
													)}
												/>
											</div>
											<div>
												<div className='text-gray-1000 font-bold text-2xl'>
													Losers
												</div>
												<Guilds
													result='loser'
													guilds={teamB.sort(
														(guildA, guildB) => guildB.score - guildA.score
													)}
												/>
											</div>
										</>
									) : (
										<>
											<div>
												<div className='text-orange-1000 font-bold text-2xl'>
													Winners
												</div>
												<Guilds
													result='winner'
													guilds={teamB.sort(
														(guildA, guildB) => guildB.score - guildA.score
													)}
												/>
											</div>
											<div>
												<div className='text-gray-1000 font-bold text-2xl'>
													Losers
												</div>
												<Guilds
													result='loser'
													guilds={teamA.sort(
														(guildA, guildB) => guildB.score - guildA.score
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
