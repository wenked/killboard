import React from 'react';
import '../styles/main.css';
import {
	MeleeDpsArray,
	TankArray,
	SupportArray,
	HealerArray,
	RangedDpsArray,
} from '../utils/zergData';

const RolesWeapons = props => {
	let role;
	console.log(props);
	switch (props.stringRole) {
		case 'Tank':
			role = TankArray;
			break;
		case 'Support':
			role = SupportArray;
			break;
		case 'Healer':
			role = HealerArray;
			break;
		case 'Ranged Dps':
			role = RangedDpsArray;
			break;
		case 'Melee Dps':
			role = MeleeDpsArray;
			break;
		default:
			role = null;
			break;
	}
	const weaponsMap = role.map(weapon => {
		const filteredRole = props.roleGuildArray.filter(a => a.weapon === weapon);
		if (filteredRole.length !== 0) {
			return <div>{`${weapon}: ${filteredRole.length}`}</div>;
		}
		return null;
	});
	return <div className='text-gray-1000 py-3'>{weaponsMap}</div>;
};

export default RolesWeapons;

//TankArray
//guildsinfo.Tank
