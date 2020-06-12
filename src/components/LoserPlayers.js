import React from 'react';
import { Table } from 'semantic-ui-react';
import BattleContext from '../context/BattleContext';

const LoserPlayers = props => {
	const battleContext = React.useContext(BattleContext);
	const LosersPlayers = battleContext.selectBattle.losers.players;

	return (
		<Table className='loserTable' inverted='true' compact='very' size='small'>
			<Table.Header className='tableList'>
				<Table.Row>
					<Table.HeaderCell>Alliance</Table.HeaderCell>
					<Table.HeaderCell>Guild</Table.HeaderCell>
					<Table.HeaderCell>Player</Table.HeaderCell>
					<Table.HeaderCell>Kills</Table.HeaderCell>
					<Table.HeaderCell>Deaths</Table.HeaderCell>
					<Table.HeaderCell>Kill Fame</Table.HeaderCell>
					<Table.HeaderCell>Item</Table.HeaderCell>
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{LosersPlayers.map(player => (
					<React.Fragment>
						<Table.Row>
							<Table.Cell>{player.allianceName}</Table.Cell>
							<Table.Cell>{player.guildName}</Table.Cell>
							<Table.Cell>{player.name}</Table.Cell>
							<Table.Cell>{player.kills}</Table.Cell>
							<Table.Cell>{player.deaths}</Table.Cell>
							<Table.Cell>{player.killFame}</Table.Cell>
							<Table.Cell>
								{!props.loading ? (
									props.weaponinfo[player.name]
								) : (
									<div className='text-orange-1000  font-bold'>Loading...</div>
								)}
							</Table.Cell>
						</Table.Row>
					</React.Fragment>
				))}
			</Table.Body>
		</Table>
	);
};

export default LoserPlayers;
