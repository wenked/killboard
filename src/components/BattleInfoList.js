import React from 'react';
import { Table } from 'semantic-ui-react';
import BattleContext from '../context/BattleContext';
import { Link } from 'react-router-dom';

const Battle = (props) => {
	const battleContext = React.useContext(BattleContext);
	const { BattleInfo } = props;

	const getInfo = () => {
		console.log(props.BattleInfo, 'estou sendo executado 1');
		battleContext.selectBattleHandler(BattleInfo);
		console.log(props.selectBattle, 'teste 2');
	};

	return (
		<React.Fragment>
			<Table.Row>
				<Table.Cell>
					<Link to={`/${BattleInfo.id}`}>
						<a onClick={getInfo}>{BattleInfo.id}</a>
					</Link>
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

export default Battle;