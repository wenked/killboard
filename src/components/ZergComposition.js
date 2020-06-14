import React from 'react';
import _ from 'lodash';
import '../styles/main.css';
import ZergGuildCompBox from './ZergGuildCompBox';

/*{showTanks ? (
	<div>
		{TankArray.map(
			weapon =>
				zergComp[i][Object.keys(guild)][weapon] !==
					undefined && (
					<div>
						{`${weapon}:${
							zergComp[i][Object.keys(guild)][weapon]
								.length
						}`}
					</div>
				)
		)}
	</div>
) : null}*/

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

		/*const guildObject = myZergs.reduce((obj, item) => {
			return Object.assign(obj, {
				[Object.keys(item)]: [Object.values(item)].reduce((obj, item) => {
					return Object.assign(obj, { [Object.keys(item)]: item });
				}),
			});
		});
		console.log(guildObject, 'estou sendo executado 2');*/
		const rolesort = _.map(guildsKeys, guild =>
			_.groupBy(props.guildzergs[guild], a => a.role)
		);
		const roleZerg = _.map(guildsKeys, (guild, i) => {
			return { [guild]: rolesort[i] };
		});

		setRolesComp(roleZerg);
		setZergComp(myZergs);
	}, [props.guildzergs]);

	React.useEffect(() => getZergComposition(), [getZergComposition]);

	//zergComp[i][Object.keys(guild)]

	return (
		<React.Fragment>
			{zergComp !== undefined && (
				<div className='text-orange-1000 font-bold block py-3 md:inline-grid grid-cols-3 col-gap-4 py-3 lg:inline-grid grid-cols-4 col-gap-4 py-3 xl:inline-grid grid-cols-6 col-gap-4 py-3'>
					{_.map(zergComp, (guild, i) => (
						<div className='shadow-xl py-3 px-3'>
							<div className='text-xl'>{Object.keys(guild)}</div>
							<ZergGuildCompBox guildsinfo={rolesComp[i][Object.keys(guild)]} />
						</div>
					))}
				</div>
			)}
		</React.Fragment>
	);
};

export default ZergComposition;
