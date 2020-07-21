import React from 'react';
import '../styles/main.css';

const RolesWeapons = (props) => {
	const weaponsMap = props.roleGuildArray.map((player, i) => {
		const filteredRole = props.roleGuildArray.filter(
			(a) => a.weapon === player.weapon
		);
		if (filteredRole.length !== 0) {
			return (
				<div className='inline-flex' key={i}>
					{player.weapon !== null && (
						<img
							src={`https://render.albiononline.com/v1/item/${player.weapon}?size=35`}
							alt='item img'
						/>
					)}
					:<div>{filteredRole.length}</div>
				</div>
			);
		}
		return null;
	});
	return <div className='font-bold text-gray-1000 py-3'>{weaponsMap}</div>;
};

export default RolesWeapons;
