import React from 'react';
import _ from 'lodash';
import '../styles/main.css';
import './transitions.css';
import ZergGuildCompBox from './ZergGuildCompBox';

const ZergComposition = props => {
	const [zergComp, setZergComp] = React.useState([]);
	const [rolesComp, setRolesComp] = React.useState({});

	const getZergComposition = React.useCallback(() => {
		const guildsKeys = Object.keys(props.guildzergs);

		const weaponsort = _.map(guildsKeys, guild =>
			_.groupBy(props.guildzergs[guild], a => a.weapon)
		);
		const myZergs = _.map(guildsKeys, (guild, i) => {
			return { [guild]: weaponsort[i] };
		});

		const rolesort = _.map(guildsKeys, guild =>
			_.groupBy(props.guildzergs[guild], a => a.role)
		);
		const roleZerg = _.map(guildsKeys, (guild, i) => {
			return { [guild]: rolesort[i] };
		});

		setRolesComp(roleZerg);
		setZergComp(myZergs);
	}, [props.guildzergs]);

	const zergCompMap = _.map(zergComp, (guild, i) => (
		<div key={i} className='shadow-xl py-3 px-3'>
			<div className='text-2xl'>{Object.keys(guild)}</div>
			<ZergGuildCompBox
				guildsinfo={rolesComp[i][Object.keys(guild)]}
				guildName={Object.keys(guild)}
			/>
		</div>
	));

	React.useEffect(() => getZergComposition(), [getZergComposition]);
	//inline-grid grid-cols-6 col-gap-4
	//zergComp[i][Object.keys(guild)]

	return (
		<React.Fragment>
			{zergComp !== undefined && (
				<div className='text-orange-1000 font-bold block py-3 md:inline-grid grid-cols-3 col-gap-4 py-3 lg:inline-grid grid-cols-4 col-gap-4 py-3 xl:inline-grid grid-cols-6 col-gap-4 py-3'>
					{zergCompMap}
				</div>
			)}
		</React.Fragment>
	);
};

export default ZergComposition;
