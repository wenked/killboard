import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { Pie } from 'react-chartjs-2';
import RolesWeapons from './RolesWeapons';
import ModalGraph from './ModalGraph';
import '../styles/main.css';
import './transitions.css';

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
			<div>
				{guildsinfo.Tank !== undefined && (
					<React.Fragment>
						<button
							className='font-bold hover:text-gray-1000'
							onClick={() => setShowTanks(!showTanks)}
						>
							Tank: {guildsinfo.Tank.length}
						</button>

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
						<button
							className='font-bold hover:text-gray-1000'
							onClick={() => setShowHealers(!showHealers)}
						>
							Healers: {guildsinfo.Healer.length}
						</button>

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
						<button
							className='font-bold hover:text-gray-1000'
							onClick={() => setShowSupports(!showSupports)}
						>
							Supports: {guildsinfo.Support.length}
						</button>

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
						<button
							className='font-bold hover:text-gray-1000'
							onClick={() => {
								setShowRangedDps(!showRangedDps);
							}}
						>
							Ranged Dps: {guildsinfo['Ranged Dps'].length}
						</button>

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
						<button
							className='font-bold hover:text-gray-1000'
							onClick={() => setShowMeleeDps(!showMeleeDps)}
						>
							Melee dps: {guildsinfo['Melee Dps'].length}
						</button>

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
				<button
					className='font-bold hover:text-gray-1000'
					onClick={() => setShowGraph(true)}
				>
					Show Graph
				</button>
				<CSSTransition
					in={showGraph}
					timeout={300}
					classNames='transition'
					unmountOnExit={true}
				>
					<ModalGraph closeModal={closeModalHandler}>
						<div>
							<div className='font-bold text-lg m-2 py-1'>
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
	);
};

export default ZergGuildCompBox;
