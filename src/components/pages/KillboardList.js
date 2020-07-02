import React from 'react';
import './KillboardList.css';
//import { Table } from 'semantic-ui-react';
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

	return (
		<React.Fragment>
			<motion.div
				variants={containerVariants}
				initial='hidden'
				animate='visible'
				exit='exit'
			>
				<table className='w-full border border-solid border-collapse border-gray-700'>
					<thead className='tableList'>
						<tr>
							<th className='bg-gray-1200'>ID</th>
							<th className='bg-gray-1200'>Time(UTC)</th>
							<th className='bg-gray-1200'>Players</th>
							<th className='bg-gray-1200'>Kills</th>
							<th className='bg-gray-1200'>Kill Fame</th>
							<th className='bg-orange-1000 font-bold'>Winning Alliance</th>
							<th className='bg-orange-1000 font-bold'>Winning Guilds</th>
							<th className='bg-gray-1200'>Losing Alliances</th>
							<th className='bg-gray-1200'>Losing Guilds</th>
						</tr>
					</thead>
					<tbody>
						{battleContext.battles.map((battle, i) => {
							return <BattleInfoList key={i} BattleInfo={battle} />;
						})}
					</tbody>
				</table>
			</motion.div>
		</React.Fragment>
	);
};

export default KillboardList;
