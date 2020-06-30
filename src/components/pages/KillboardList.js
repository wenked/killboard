import React from 'react';
import './KillboardList.css';
import { Table } from 'semantic-ui-react';
import BattleInfoList from '../BattleInfoList';
import BattleContext from '../../context/BattleContext';
import { motion } from 'framer-motion';

const containerVariants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: { delay: 0.5, duration: 0.5 },
	},
	exit: {
		opacity: 0,
		transition: { duration: 0.5 },
	},
};

const KillboardList = props => {
	const battleContext = React.useContext(BattleContext);
	const mystyle = {
		backgroundColor: '#ff5a09',
		fontWeight: 'bolder',
	};

	return (
		<React.Fragment>
			<motion.div
				variants={containerVariants}
				initial='hidden'
				animate='visible'
				exit='exit'
			>
				<Table className='tableList' celled selectable size='small' inverted>
					<Table.Header className='tableList'>
						<Table.Row>
							<Table.HeaderCell>ID</Table.HeaderCell>
							<Table.HeaderCell>Time(UTC)</Table.HeaderCell>
							<Table.HeaderCell>Players</Table.HeaderCell>
							<Table.HeaderCell>Kills</Table.HeaderCell>
							<Table.HeaderCell>Kill Fame</Table.HeaderCell>
							<Table.HeaderCell style={mystyle}>
								Winning Alliance
							</Table.HeaderCell>
							<Table.HeaderCell style={mystyle}>
								Winning Guilds
							</Table.HeaderCell>
							<Table.HeaderCell>Losing Alliances</Table.HeaderCell>
							<Table.HeaderCell>Losing Guilds</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{battleContext.battles.map((battle, i) => {
							return <BattleInfoList key={i} BattleInfo={battle} />;
						})}
					</Table.Body>
				</Table>
			</motion.div>
		</React.Fragment>
	);
};

export default KillboardList;