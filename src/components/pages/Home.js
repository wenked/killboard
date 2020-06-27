import React from 'react';
import BattleContext from '../../context/BattleContext';
import '../../styles/main.css';
import { motion } from 'framer-motion';

const containerVariants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: { delay: 1.5, duration: 1.5 },
	},
	exit: {
		x: '-100vw',
		transition: { ease: 'easeInOut' },
	},
};

const Home = () => {
	const battleContext = React.useContext(BattleContext);
	console.log(battleContext);

	React.useEffect(() => battleContext.loading(), [battleContext]);
	return (
		<motion.div
			variants={containerVariants}
			initial='hidden'
			animate='visible'
			exit='exit'
		></motion.div>
	);
};

export default Home;
