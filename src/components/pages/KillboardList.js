import React from 'react';
import './KillboardList.css';
//import { Table } from 'semantic-ui-react';
import BattleInfoList from '../BattleInfoList';
import BattleContext from '../../context/BattleContext';
import { motion } from 'framer-motion';
import { Loader } from 'semantic-ui-react';

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

const KillboardList = () => {
	const {
		battles,
		isLoading,
		isError,
		offset,
		setOffSet,
		isFetching,
	} = React.useContext(BattleContext);

	return isLoading ? (
		<Loader size='big' active inverted>
			Loading...
		</Loader>
	) : isError ? (
		<div className='p-1 m-1 flex justify-center items-center text-gray-1000 font-bold'>
			Failed to fetch data
		</div>
	) : (
		<React.Fragment>
			<motion.div
				variants={containerVariants}
				initial='hidden'
				animate='visible'
				exit='exit'>
				{isFetching ? (
					isError ? (
						<div className='font-bold p-1 m-1 text-gray-100'>
							Failed to fetch data !
						</div>
					) : (
						<div className='font-bold p-1 m-1 text-gray-100'>Loading...</div>
					)
				) : null}
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
						{battles !== undefined &&
							battles.battleList.map((battle, i) => {
								return <BattleInfoList key={i} BattleInfo={battle} />;
							})}
					</tbody>
				</table>
			</motion.div>
			<div className='inline-flex'>
				<button
					className='m-2 bg-orange-1000 text-gray-1000 hover:bg-gray-100 hover:text-orange-1000 font-bold py-3 px-4 rounded flex'
					onClick={() => (offset > 0 ? setOffSet(offset - 50) : null)}>
					Prev
				</button>
				<button
					className='m-2 bg-orange-1000 text-gray-1000 hover:bg-gray-100 hover:text-orange-1000 font-bold py-3 px-4 rounded flex'
					onClick={() => setOffSet(offset + 50)}>
					Next
				</button>
				{isFetching ? (
					<div className='font-bold p-1 m-1 text-gray-100'>Loading...</div>
				) : null}
			</div>
		</React.Fragment>
	);
};

export default KillboardList;
