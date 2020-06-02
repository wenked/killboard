import React from 'react';
import './KillboardList.css';
import { Table } from 'semantic-ui-react';
import Battle from './Battle';

const KillboardList = (props) => {
	return (
		<React.Fragment>
			<Table celled color='grey' inverted='true' selectable='true'>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>ID</Table.HeaderCell>
						<Table.HeaderCell>Time(UTC)</Table.HeaderCell>
						<Table.HeaderCell>Players</Table.HeaderCell>
						<Table.HeaderCell>Kills</Table.HeaderCell>
						<Table.HeaderCell>Kill Fame</Table.HeaderCell>
						<Table.HeaderCell>Winning Alliance</Table.HeaderCell>
						<Table.HeaderCell>Winning Guilds</Table.HeaderCell>
						<Table.HeaderCell>Loosing Alliances</Table.HeaderCell>
						<Table.HeaderCell>Loosing Guilds</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{props.Battles.map((battle) => {
						return <Battle BattleInfo={battle} />;
					})}
				</Table.Body>
			</Table>
		</React.Fragment>
	);
};

export default KillboardList;
