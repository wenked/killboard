import React from 'react';
import Guilds from './Guilds';
import ModalGraph from './ModalGraph';
import Team from './Team';

const reducer = (accumulator, currentValue) => accumulator + currentValue;

const Handholding = ({ guilds }) => {
	const [teamA, setTeamA] = React.useState([]);
	const [teamB, setTeamB] = React.useState([]);
	const [showTable, setShowTable] = React.useState(false);

	const guildsMap = guilds.map((guild, i) => {
		return (
			<div key={i} className='font-bold text-orange-1000 block'>
				<div>
					<div>{guild.name}</div>
					<button
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
					</button>
					<button
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
					</button>
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
						<div>
							{teamA.length !== 0 && teamA.map(el => el.score).reduce(reducer)}
						</div>
					</div>
					<div className='font-bold text-orange-1000 '>
						Team B: <Team team={teamB} setTeam={setTeamB} />
						<div>
							{teamB.length !== 0 && teamB.map(el => el.score).reduce(reducer)}
						</div>
					</div>
				</div>
			</div>
			<div>
				<button
					className='text-orange-1000 font-bold'
					onClick={() => setShowTable(!showTable)}
				>
					HandHold Kb
				</button>
				{showTable ? (
					<ModalGraph size='big' closeModal={() => setShowTable(false)}>
						<div className='grid gap-3 grid-cols-2 py-4'>
							<div>
								{resultA > resultB ? (
									<div className='text-orange-1000 font-bold text-xl'>
										Winners
									</div>
								) : (
									<div className='text-gray-1000 font-bold text-xl'>Losers</div>
								)}
								<Guilds
									result={resultA > resultB ? 'winner' : 'loser'}
									guilds={teamA.sort(
										(guildA, guildB) => guildB.score - guildA.score
									)}
								/>
							</div>
							<div>
								<div>
									{resultB > resultA ? (
										<div className='text-orange-1000 font-bold text-xl'>
											Winners
										</div>
									) : (
										<div className='text-gray-1000 font-bold text-xl'>
											Losers
										</div>
									)}
								</div>
								<Guilds
									result={resultB > resultA ? 'winner' : 'loser'}
									guilds={teamB.sort(
										(guildA, guildB) => guildB.score - guildA.score
									)}
								/>
							</div>
						</div>
					</ModalGraph>
				) : null}
			</div>
		</>
	);
};

export default Handholding;
