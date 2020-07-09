import React from 'react';
import '../styles/main.css';
import { motion, AnimatePresence } from 'framer-motion';

const buttonVariants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: { delay: 0.5, duration: 0.5, type: 'spring', stiffness: 300 },
	},
	exit: {
		opacity: 0,
	},
	hover: {
		scale: 1.1,
	},
};

const Team = ({ team, dispatch }) => {
	const teamMap = team.map((guild, i) => (
		<div key={i}>
			<AnimatePresence>
				<motion.button
					variants={buttonVariants}
					whileHover='hover'
					initial='hidden'
					animate='visible'
					exit='exit'
					transition='visible'
					onClick={() =>
						dispatch({ type: 'REMOVE_GUILD', guildName: guild.name })
					}>
					<div className='text-gray-1000 block'>{guild.name}</div>
				</motion.button>
			</AnimatePresence>
		</div>
	));
	return <div>{teamMap}</div>;
};

export default Team;
