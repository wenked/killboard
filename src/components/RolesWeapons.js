import React from 'react';
import '../styles/main.css';

const RolesWeapons = (props) => {
	console.log(props.roleGuildArray);
	let weaponsArr = [];
	const weaponsMap = props.roleGuildArray.map((player, i) => {
		const filteredRole = props.roleGuildArray.filter(
			(a) => a.weapon === player.weapon
		);

		if (filteredRole.length !== 0 && !weaponsArr.includes(player.weapon)) {
			weaponsArr.push(player.weapon);
			return (
				<div className='inline-flex ' key={i}>
					<div className='font-bold text-lg'>{filteredRole.length}</div>
					{player.weapon !== null && (
						<img
							src={`https://render.albiononline.com/v1/item/${filteredRole[0].weapon}?size=35`}
							alt='item img'
						/>
					)}
				</div>
			);
		}
		return null;
	});
	return <div className='font-bold text-gray-1000 py-4'>{weaponsMap}</div>;
};

export default RolesWeapons;
