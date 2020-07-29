import React from 'react';
//import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { convertString } from '../utils/zergData';
import '../styles/main.css';

const BattleInfoLIst = (props) => {
	const { BattleInfo } = props;

	return (
		<React.Fragment>
			<tr>
				<td className='p-1 hover:bg-orange-1000'>
					<Link
						className='hover:text-gray-1000'
						to={`/killboards/${BattleInfo.id}`}>
						{BattleInfo.id}
					</Link>
				</td>
				<td className='p-1 m-1'>{convertString(BattleInfo.endTime)}</td>
				<td className='p-1 m-1'>{BattleInfo.totalPlayers}</td>
				<td className='p-1 m-1'>{BattleInfo.totalKills}</td>
				<td className='p-1 m-1'>{BattleInfo.totalFame.toLocaleString()}</td>
				<td className='p-1 m-1'>
					{BattleInfo.winnerAllys !== 0 && BattleInfo.winnerAllys[0]}
				</td>
				<td className='font-bold p-1 m-1'>
					{BattleInfo.winnerGuilds.length !== 0 && BattleInfo.winnerGuilds[0]}
				</td>
				<td className='p-1 m-1'>
					{BattleInfo.losersAllys.length !== 0 && BattleInfo.losersAllys[0]}
				</td>
				<td className='font-bold p-1 m-1'>
					{BattleInfo.losersGuilds !== 0 &&
						BattleInfo.losersGuilds.map((guild, i) =>
							i + 1 !== BattleInfo.losersGuilds.length ? `${guild}, ` : guild
						)}
				</td>
			</tr>
		</React.Fragment>
	);
};

export default BattleInfoLIst;
