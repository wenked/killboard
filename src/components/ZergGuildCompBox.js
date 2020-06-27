import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { Pie } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import RolesWeapons from './RolesWeapons';
import ModalGraph from './ModalGraph';
import '../styles/main.css';
import './transitions.css';

const buttonVariants = {
	visible: {
		transition: { type: 'spring', stiffness: 300 },
	},
	hover: {
		scale: 1.1,
	},
};

const checkUndefined = elem => {
	if (elem === undefined) {
		return 0;
	}
	return elem.length;
};

const ZergGuildCompBox = props => {
	const [showTanks, setShowTanks] = React.useState(false);
	const [showHealers, setShowHealers] = React.useState(false);
	const [showSupports, setShowSupports] = React.useState(false);
	const [showRangedDps, setShowRangedDps] = React.useState(false);
	const [showMeleeDps, setShowMeleeDps] = React.useState(false);
	const [showComp, setShowComp] = React.useState(false);
	const guildsinfo = props.guildsinfo;
	const [graphData, setGraphData] = React.useState([]);
	const [showGraph, setShowGraph] = React.useState(false);
	const closeModalHandler = () => {
		setShowGraph(false);
	};

	React.useEffect(() => {
		setGraphData([
			checkUndefined(guildsinfo.Tank),
			checkUndefined(guildsinfo.Healer),
			checkUndefined(guildsinfo.Support),
			checkUndefined(guildsinfo['Ranged Dps']),
			checkUndefined(guildsinfo['Melee Dps']),
		]);
	}, [guildsinfo]);
	const data = {
		labels: ['Tank', 'Healer', 'Support', 'Ranged Dps', 'Melee Dps'],
		datasets: [
			{
				data: graphData,
				backgroundColor: [
					'#ff5a09',
					'#ec7f37',
					'#be4f0c',
					'#fed7d7',
					'#feb2b2',
				],
				hoverBackgroundColor: [
					'#ff5a09',
					'#ec7f37',
					'#be4f0c',
					'#fed7d7',
					'#feb2b2',
				],
				borderColor: '#d4d4dc',
				borderWidth: 1,
			},
		],
	};

	return (
		<div className='text-orange-1100 py-2 block'>
			<motion.button
				variants={buttonVariants}
				whileHover='hover'
				transition='visible'
				onClick={() => setShowComp(!showComp)}
			>
				<div className='font-bold text-orange-1000 text-2xl hover:text-gray-1000'>
					{props.guildName}
				</div>
			</motion.button>
			<CSSTransition
				in={showComp}
				timeout={300}
				classNames='transition'
				unmountOnExit={true}
			>
				<div>
					<div>
						{guildsinfo.Tank !== undefined && (
							<React.Fragment>
								<motion.button
									variants={buttonVariants}
									whileHover='hover'
									transition='visible'
									className='text-lg font-bold hover:text-gray-1000'
									onClick={() => setShowTanks(!showTanks)}
								>
									Tank: {guildsinfo.Tank.length}
								</motion.button>

								<CSSTransition
									in={showTanks}
									timeout={300}
									classNames='transition'
									unmountOnExit={true}
								>
									<RolesWeapons
										stringRole={`Tank`}
										roleGuildArray={guildsinfo.Tank}
									/>
								</CSSTransition>
							</React.Fragment>
						)}
					</div>
					<div>
						{guildsinfo.Healer !== undefined && (
							<React.Fragment>
								<motion.button
									variants={buttonVariants}
									whileHover='hover'
									transition='visible'
									className='text-lg font-bold hover:text-gray-1000'
									onClick={() => setShowHealers(!showHealers)}
								>
									Healers: {guildsinfo.Healer.length}
								</motion.button>

								<CSSTransition
									in={showHealers}
									timeout={300}
									classNames='transition'
									unmountOnExit={true}
								>
									<RolesWeapons
										stringRole={`Healer`}
										roleGuildArray={guildsinfo.Healer}
									/>
								</CSSTransition>
							</React.Fragment>
						)}
					</div>
					<div>
						{guildsinfo.Support !== undefined && (
							<React.Fragment>
								<motion.button
									variants={buttonVariants}
									whileHover='hover'
									transition='visible'
									className='text-lg font-bold hover:text-gray-1000'
									onClick={() => setShowSupports(!showSupports)}
								>
									Supports: {guildsinfo.Support.length}
								</motion.button>

								<CSSTransition
									in={showSupports}
									timeout={300}
									classNames='transition'
									unmountOnExit={true}
								>
									<RolesWeapons
										stringRole={`Support`}
										roleGuildArray={guildsinfo.Support}
									/>
								</CSSTransition>
							</React.Fragment>
						)}
					</div>
					<div>
						{guildsinfo['Ranged Dps'] !== undefined && (
							<React.Fragment>
								<motion.button
									variants={buttonVariants}
									whileHover='hover'
									transition='visible'
									className='text-lg font-bold hover:text-gray-1000'
									onClick={() => {
										setShowRangedDps(!showRangedDps);
									}}
								>
									Ranged Dps: {guildsinfo['Ranged Dps'].length}
								</motion.button>

								<CSSTransition
									in={showRangedDps}
									timeout={300}
									classNames='transition'
									unmountOnExit={true}
								>
									<RolesWeapons
										stringRole={`Ranged Dps`}
										roleGuildArray={guildsinfo['Ranged Dps']}
									/>
								</CSSTransition>
							</React.Fragment>
						)}
					</div>
					<div>
						{guildsinfo['Melee Dps'] !== undefined && (
							<React.Fragment>
								<motion.button
									variants={buttonVariants}
									whileHover='hover'
									transition='visible'
									className='text-lg font-bold hover:text-gray-1000'
									onClick={() => setShowMeleeDps(!showMeleeDps)}
								>
									Melee dps: {guildsinfo['Melee Dps'].length}
								</motion.button>

								<CSSTransition
									in={showMeleeDps}
									timeout={300}
									classNames='transition'
									unmountOnExit={true}
								>
									<RolesWeapons
										stringRole={`Melee Dps`}
										roleGuildArray={guildsinfo['Melee Dps']}
									/>
								</CSSTransition>
							</React.Fragment>
						)}
					</div>

					<div>
						<motion.button
							variants={buttonVariants}
							whileHover='hover'
							transition='visible'
							className='text-lg font-bold hover:text-gray-1000'
							onClick={() => setShowGraph(true)}
						>
							Show Graph
						</motion.button>
						<CSSTransition
							in={showGraph}
							timeout={300}
							classNames='transition'
							unmountOnExit={true}
						>
							<ModalGraph size='small' closeModal={closeModalHandler}>
								<div>
									<div className='font-bold text-2xl  mb-8 py-1 text-center '>
										{props.guildName}
									</div>
									<Pie
										data={data}
										style={{ height: '200px', width: '200px' }}
										options={{
											responsive: true,
											maintainAspectRatio: false,
											legend: {
												display: true,
												labels: {
													fontFamily: 'Ubuntu',
													fontColor: '#d4d4dc',
												},
											},
										}}
									/>
								</div>
							</ModalGraph>
						</CSSTransition>
					</div>
				</div>
			</CSSTransition>
		</div>
	);
};

export default ZergGuildCompBox;
