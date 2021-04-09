import React from 'react';
import '../../styles/main.css';
import BattleContext from '../../context/BattleContext';
import { Link } from 'react-router-dom';

const Guilds = ({ result, guilds }) => {
	const { setSearchTerm } = React.useContext(BattleContext);
	let myCSS;
	if (result === 'winner') {
		myCSS = 'font-bold bg-orange-1000 border-collapse text-left';
	} else {
		myCSS = 'font-bold bg-gray-1200 text-gray-1000 border-collapse text-left';
	}
	const tableCss = 'border-collapse text-left';

	return (
		<table className='w-full border border-solid border-collapse border-gray-700'>
			<thead>
				<tr>
					<th className={myCSS}>Alliance</th>
					<th className={myCSS}>Guild</th>
					<th className={myCSS}>Players</th>
					<th className={myCSS}>Kills</th>
					<th className={myCSS}>Deaths</th>
					<th className={myCSS}>Kill Fame</th>
					<th className={myCSS}>Average IP</th>
				</tr>
			</thead>
			<tbody>
				{guilds.map((guild, i) => (
					<React.Fragment key={i}>
						<tr>
							<td className={tableCss}>{guild.alliance}</td>
							<td
								className={
									tableCss +
									` no-underline cursor-pointer  hover:bg-orange-1000  `
								}>
								<Link
									className='hover:text-gray-1000'
									onClick={() => setSearchTerm(guild.name)}
									to='/killboards'>
									{guild.name}
								</Link>
							</td>
							<td className={tableCss}>{guild.totalPlayers}</td>
							<td className={tableCss}>{guild.kills}</td>
							<td className={tableCss}>{guild.deaths}</td>
							<td className={tableCss}>{guild.killFame.toLocaleString()}</td>
							<td className={tableCss}>
								{guild.guildAverageIp.toLocaleString()}
							</td>
						</tr>
					</React.Fragment>
				))}
			</tbody>
		</table>
	);
};

export default Guilds;
