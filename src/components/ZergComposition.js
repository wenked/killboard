import React from 'react';
import _ from 'lodash';
import '../styles/main.css';
import './transitions.css';
import ZergGuildCompBox from './ZergGuildCompBox';

const ZergComposition = (props) => {
	const zergCompMap = _.map(props.guilds, (guild, i) => (
		<div key={i} className=' py-3 px-3'>
			<ZergGuildCompBox guild={guild} />
		</div>
	));

	return (
		<React.Fragment>
			{props.guilds !== undefined && (
				<div className='text-orange-1000 font-bold block py-3 md:inline-grid grid-cols-3 col-gap-4 py-3 lg:inline-grid grid-cols-4 col-gap-4 py-3 xl:inline-grid grid-cols-6 col-gap-4 py-3'>
					{zergCompMap}
				</div>
			)}
		</React.Fragment>
	);
};

export default ZergComposition;
