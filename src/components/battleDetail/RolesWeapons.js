import React from 'react';
import '../../styles/main.css';
import { motion } from 'framer-motion';
import { CSSTransition } from 'react-transition-group';
import './transitions.css';

const RolesWeapons = ({
	role,
	variants,
	setShow,
	buttonBoolean,
	roleGuildArray,
}) => {
	let weaponsArr = [];
	const weaponsMap = roleGuildArray.map((player, i) => {
		const filteredRole = roleGuildArray.filter(
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
	return (
		<>
			<motion.button
				variants={variants}
				whileHover='hover'
				transition='visible'
				className='text-lg font-bold hover:text-gray-1000'
				onClick={() => setShow(!buttonBoolean)}>
				{`${role}:${roleGuildArray.length}`}
			</motion.button>
			<CSSTransition
				in={buttonBoolean}
				timeout={300}
				classNames='transition'
				unmountOnExit={true}>
				<div className='font-bold text-gray-1000 py-4'>{weaponsMap}</div>
			</CSSTransition>
		</>
	);
};

export default RolesWeapons;
