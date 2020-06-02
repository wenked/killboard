import React from 'react';
import { Table } from 'semantic-ui-react';
import BattleContext from '../context/BattleContext';

const WinnerPlayers = (props) => {
	const battleContext = React.useContext(BattleContext);
	const WinnersPlayers = battleContext.selectBattle.winners.players;
	return (
		<Table color='grey' inverted='true' compact='very' size='small'>
			<Table.Row>
				<Table.Header>
					<Table.HeaderCell>Alliance</Table.HeaderCell>
					<Table.HeaderCell>Guild</Table.HeaderCell>
					<Table.HeaderCell>Player</Table.HeaderCell>
					<Table.HeaderCell>Kills</Table.HeaderCell>
					<Table.HeaderCell>Deaths</Table.HeaderCell>
					<Table.HeaderCell>Kill Fame</Table.HeaderCell>
				</Table.Header>
			</Table.Row>
			<Table.Body>
				{WinnersPlayers.map((player) => (
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

export default WinnerPlayers;
