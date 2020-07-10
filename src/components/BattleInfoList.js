import React from 'react';
//import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { convertString } from '../utils/zergData';
import '../styles/main.css';

Number.prototype.format = function (n, x) {
	var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
	return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

const BattleInfoLIst = props => {
	const { BattleInfo } = props;
	return (
		<React.Fragment>
			<tr>
				<td className='hover:bg-orange-1000'>
					<Link
						className='hover:text-gray-1000'
						to={`/killboards/${BattleInfo.id}`}
					>
						{BattleInfo.id}
					</Link>
				</td>
				<td>{convertString(BattleInfo.endTime)}</td>
				<td>{BattleInfo.totalPlayers}</td>
				<td>{BattleInfo.totalKills}</td>
				<td>{BattleInfo.totalFame.format()}</td>
				<td>
					{BattleInfo.winners.alliances.length > 0 &&
						BattleInfo.winners.alliances[0].name}
				</td>
				<td className='font-bold'>
					{BattleInfo.winners.guilds.length > 0 &&
						BattleInfo.winners.guilds[0].name}
				</td>
				<td>
					{BattleInfo.losers.alliances.length > 0 &&
						BattleInfo.losers.alliances[0].name}
				</td>
				<td className='font-bold'>
					{BattleInfo.losers.guilds.length > 0 &&
						BattleInfo.losers.guilds[0].name}
				</td>
			</tr>
		</React.Fragment>
	);
};

export default BattleInfoLIst;
