import React from 'react';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../styles/main.css';

const BattleInfoLIst = props => {
	const { BattleInfo } = props;
	return (
		<React.Fragment>
			<Table.Row>
				<Table.Cell className='hover:bg-orange-1000'>
					<Link to={`/killboards/${BattleInfo.id}`}>{BattleInfo.id}</Link>
				</Table.Cell>
				<Table.Cell>{BattleInfo.endTime}</Table.Cell>
				<Table.Cell>{BattleInfo.totalPlayers}</Table.Cell>
				<Table.Cell>{BattleInfo.totalKills}</Table.Cell>
				<Table.Cell>{BattleInfo.totalFame}</Table.Cell>
				<Table.Cell>
					{BattleInfo.winners.alliances.length > 0 &&
						BattleInfo.winners.alliances[0].name}
				</Table.Cell>
				<Table.Cell>
					{BattleInfo.winners.guilds.length > 0 &&
						BattleInfo.winners.guilds[0].name}
				</Table.Cell>
				<Table.Cell>
					{BattleInfo.losers.alliances.length > 0 &&
						BattleInfo.losers.alliances[0].name}
				</Table.Cell>
				<Table.Cell>
					{BattleInfo.losers.guilds.length > 0 &&
						BattleInfo.losers.guilds[0].name}
				</Table.Cell>
			</Table.Row>
		</React.Fragment>
	);
};

export default BattleInfoLIst;
