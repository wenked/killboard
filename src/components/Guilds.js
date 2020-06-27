import React from 'react';
import '../styles/main.css';
import { Table } from 'semantic-ui-react';

const Guilds = ({ result, guilds }) => {
	let myCSS;
	if (result === 'winner') {
		myCSS = 'bg-orange-1000';
	} else {
		myCSS = 'bg-gray-1100 text-gray-1000';
	}

	return (
		<Table size='small' inverted className={myCSS}>
			<Table.Header className={myCSS}>
				<Table.Row>
					<Table.HeaderCell>Alliance</Table.HeaderCell>
					<Table.HeaderCell>Guild</Table.HeaderCell>
					<Table.HeaderCell>Players</Table.HeaderCell>
					<Table.HeaderCell>Kills</Table.HeaderCell>
					<Table.HeaderCell>Deaths</Table.HeaderCell>
					<Table.HeaderCell>Kill Fame</Table.HeaderCell>
					<Table.HeaderCell>Average IP</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{guilds.map((guild, i) => (
					<React.Fragment key={i}>
						<Table.Row>
							<Table.Cell>{guild.alliance}</Table.Cell>
							<Table.Cell>{guild.name}</Table.Cell>
							<Table.Cell>{guild.totalPlayers}</Table.Cell>
							<Table.Cell>{guild.kills}</Table.Cell>
							<Table.Cell>{guild.deaths}</Table.Cell>
							<Table.Cell>{guild.killFame}</Table.Cell>
							<Table.Cell>{guild.averageItemPower}</Table.Cell>
						</Table.Row>
					</React.Fragment>
				))}
			</Table.Body>
		</Table>
	);
};

export default Guilds;
