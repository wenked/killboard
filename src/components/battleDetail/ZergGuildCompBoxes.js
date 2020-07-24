import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { Pie } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import RolesWeapons from './RolesWeapons';
import ModalGraph from './ModalGraph';
import '../../styles/main.css';
import './transitions.css';

const buttonVariants = {
	visible: {
		transition: { type: 'spring', stiffness: 300 },
	},
	hover: {
		scale: 1.1,
	},
};

const checkUndefined = (elem) => {
	if (elem === undefined) {
		return 0;
	}
	return elem.length;
};

const ZergGuildCompBoxes = (props) => {
	const [showTanks, setShowTanks] = React.useState(false);
	const [showHealers, setShowHealers] = React.useState(false);
	const [showSupports, setShowSupports] = React.useState(false);
	const [showRangedDps, setShowRangedDps] = React.useState(false);
	const [showMeleeDps, setShowMeleeDps] = React.useState(false);
	const [showComp, setShowComp] = React.useState(false);
	const guild = props.guild;
	const [graphData, setGraphData] = React.useState([]);
	const [showGraph, setShowGraph] = React.useState(false);
	const closeModalHandler = () => {
		setShowGraph(false);
	};

	React.useEffect(() => {
		setGraphData([
			checkUndefined(guild.tanks),
			checkUndefined(guild.healers),
			checkUndefined(guild.supports),
			checkUndefined(guild.rangedDps),
			checkUndefined(guild.melees),
		]);
	}, [guild]);
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
				onClick={() => setShowComp(!showComp)}>
				<div className='font-bold text-orange-1000 text-xl hover:text-gray-1000'>
					{guild.name}
				</div>
			</motion.button>
			<CSSTransition
				in={showComp}
				timeout={300}
				classNames='transition'
				unmountOnExit={true}>
				<div className='pt-2'>
					<div>
						{guild.tanks !== undefined && (
							<RolesWeapons
								role='Tanks'
								roleGuildArray={guild.tanks}
								variants={buttonVariants}
								setShow={setShowTanks}
								buttonBoolean={showTanks}
							/>
						)}
					</div>
					<div>
						{guild.healers !== undefined && (
							<RolesWeapons
								role='Healers'
								roleGuildArray={guild.healers}
								variants={buttonVariants}
								setShow={setShowHealers}
								buttonBoolean={showHealers}
							/>
						)}
					</div>
					<div>
						{guild.supports !== undefined && (
							<RolesWeapons
								roleGuildArray={guild.supports}
								buttonBoolean={showSupports}
								setShow={setShowSupports}
								variants={buttonVariants}
								role='Supports'
							/>
						)}
					</div>
					<div>
						{guild.rangedDps !== undefined && (
							<RolesWeapons
								role='Ranged Dps'
								roleGuildArray={guild.rangedDps}
								buttonBoolean={showRangedDps}
								variants={buttonVariants}
								setShow={setShowRangedDps}
							/>
						)}
					</div>
					<div>
						{guild.melees !== undefined && (
							<RolesWeapons
								role='Melee Dps'
								roleGuildArray={guild.melees}
								buttonBoolean={showMeleeDps}
								setShow={setShowMeleeDps}
								variants={buttonVariants}
							/>
						)}
					</div>

					<div>
						<motion.button
							variants={buttonVariants}
							whileHover='hover'
							transition='visible'
							className='text-lg font-bold hover:text-gray-1000'
							onClick={() => setShowGraph(true)}>
							Show Graph
						</motion.button>
						<CSSTransition
							in={showGraph}
							timeout={300}
							classNames='transition'
							unmountOnExit={true}>
							<ModalGraph size='small' closeModal={closeModalHandler}>
								<div>
									<div className='font-bold text-2xl  mb-8 py-1 text-center '>
										{guild.name}
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
													fontFamily: 'Roboto',
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

export default ZergGuildCompBoxes;
