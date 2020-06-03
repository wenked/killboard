import React from 'react';
import './KillboardList.css';
import { Table } from 'semantic-ui-react';
import BattleInfoList from './BattleInfoList';
import BattleContext from '../context/BattleContext';

const KillboardList = (props) => {
	const battleContext = React.useContext(BattleContext);

	return (
		<React.Fragment>
			<Table
				className='tableList'
				celled
				selectable='true'
				size='small'
				inverted='true'
			>
				<Table.Header className='tableList'>
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
					{battleContext.battles.map((battle) => {
						return <BattleInfoList BattleInfo={battle} />;
					})}
				</Table.Body>
			</Table>
		</React.Fragment>
	);
};

export default KillboardList;
