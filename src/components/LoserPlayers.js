import React from 'react';
import { Table } from 'semantic-ui-react';
import BattleContext from '../context/BattleContext';

const LoserPlayers = (props) => {
	const battleContext = React.useContext(BattleContext);
	const LosersPlayers = battleContext.selectBattle.losers.players;

	return (
		<Table color='black' inverted='true' compact='very' size='small'>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Alliance</Table.HeaderCell>
					<Table.HeaderCell>Guild</Table.HeaderCell>
					<Table.HeaderCell>Player</Table.HeaderCell>
					<Table.HeaderCell>Kills</Table.HeaderCell>
					<Table.HeaderCell>Deaths</Table.HeaderCell>
					<Table.HeaderCell>Kill Fame</Table.HeaderCell>
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{LosersPlayers.map((player) => (
					<React.Fragment>
						<Table.Row>
							<Table.Cell>{player.allianceName}</Table.Cell>
							<Table.Cell>{player.guildName}</Table.Cell>
							<Table.Cell>{player.name}</Table.Cell>
							<Table.Cell>{player.kills}</Table.Cell>
							<Table.Cell>{player.deaths}</Table.Cell>
							<Table.Cell>{player.killFame}</Table.Cell>
						</Table.Row>
					</React.Fragment>
				))}
			</Table.Body>
		</Table>
	);
};

export default LoserPlayers;
