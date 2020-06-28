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

const Team = ({ team, setTeam }) => {
	const teamMap = team.map(guild => (
		<div>
			<motion.button
				variants={buttonVariants}
				whileHover='hover'
				transition='visible'
				onClick={() =>
					setTeam(
						team.filter(selectedguild => selectedguild.name !== guild.name)
					)
				}
			>
				<div className='text-gray-1000 block'>{guild.name}</div>
			</motion.button>
		</div>
	));
	return <div>{teamMap}</div>;
};

export default Team;
