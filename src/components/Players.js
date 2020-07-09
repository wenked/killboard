import React from 'react';
//import { table } from 'semantic-ui-react';
import '../styles/main.css';

const Players = props => {
	let resultClass;
	const tableCss = 'border-collapse text-left';
	if (props.battleresult === 'winner') {
		resultClass = 'font-bold bg-orange-1000 border-collapse text-left';
	} else {
		resultClass =
			'font-bold bg-gray-1200 text-gray-1000 border-collapse text-left';
	}

	return (
		<table className='w-full border border-solid border-collapse border-gray-700'>
			<thead className={`${resultClass}`}>
				<tr>
					<th className={resultClass}>Alliance</th>
					<th className={resultClass}>Guild</th>
					<th className={resultClass}>Player</th>
					<th className={resultClass}>Kills</th>
					<th className={resultClass}>Deaths</th>
					<th className={resultClass}>Kill Fame</th>
					<th className={resultClass}>Item</th>
				</tr>
			</thead>

			<tbody>
				{props.players.map(player => (
					<React.Fragment key={player.id}>
						<tr>
							<td className={tableCss}>{player.allianceName}</td>
							<td className={tableCss}>{player.guildName}</td>
							<td className={tableCss}>{player.name}</td>
							<td className={tableCss}>{player.kills}</td>
							<td className={tableCss}>{player.deaths}</td>
							<td className={tableCss}>{player.killFame}</td>
							<td className={tableCss}>
								{player.equipment !== null &&
									player.equipment.mainHand !== null && (
										<img
											src={`https://render.albiononline.com/v1/item/${player.equipment.mainHand.type}?size=35`}
											alt='item img'
										/>
									)}
							</td>
						</tr>
					</React.Fragment>
				))}
			</tbody>
		</table>
	);
};

export default Players;
