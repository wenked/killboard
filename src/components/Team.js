import React from 'react';
import '../styles/main.css';
import { motion } from 'framer-motion';

const buttonVariants = {
	visible: {
		transition: { type: 'spring', stiffness: 300 },
	},
	hover: {
		scale: 1.1,
	},
};

const Team = ({ team, dispatch }) => {
	const teamMap = team.map(guild => (
		<div>
			<motion.button
				variants={buttonVariants}
				whileHover='hover'
				transition='visible'
				onClick={() =>
					dispatch({ type: 'REMOVE_GUILD', guildName: guild.name })
				}
			>
				<div className='text-gray-1000 block'>{guild.name}</div>
			</motion.button>
		</div>
	));
	return <div>{teamMap}</div>;
};

export default Team;
