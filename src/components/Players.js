import React from 'react';
import { Table } from 'semantic-ui-react';
import '../styles/main.css';
//import items from './items';

/*const organizeItems = (obj, item) => {
	if (item.LocalizedNames !== null) {
		return Object.assign(obj, {
			[item.UniqueName]: item.LocalizedNames['EN-US'],
		});
	}

	return Object.assign(obj, { nada: 'nada' });
};*/

const Players = props => {
	//const normalNameItems = items.reduce(organizeItems, {});
	let resultClass;
	if (props.battleresult === 'winner') {
		resultClass = 'bg-orange-1000';
	} else {
		resultClass = 'bg-gray-1100 text-gray-1000';
	}

	return (
		<Table inverted compact='very' size='small'>
			<Table.Header className={`${resultClass}`}>
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
				{props.players.map(player => (
					<React.Fragment key={player.id}>
						<Table.Row>
							<Table.Cell>{player.allianceName}</Table.Cell>
							<Table.Cell>{player.guildName}</Table.Cell>
							<Table.Cell>{player.name}</Table.Cell>
							<Table.Cell>{player.kills}</Table.Cell>
							<Table.Cell>{player.deaths}</Table.Cell>
							<Table.Cell>{player.killFame}</Table.Cell>
							<Table.Cell>
								{player.equipment !== null &&
									player.equipment.mainHand !== null && (
										<img
											src={`https://render.albiononline.com/v1/item/${player.equipment.mainHand.type}?size=35`}
											alt='item img'
										/>
									)}
							</Table.Cell>
						</Table.Row>
					</React.Fragment>
				))}
			</Table.Body>
		</Table>
	);
};

export default Players;
