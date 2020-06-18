import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { Pie } from 'react-chartjs-2';
import '../styles/main.css';
import './transitions.css';

const TankArray = [
	'Mace',
	'Heavy Mace',
	'Morning Star',
	'Bedrock Mace',
	'Incubus Mace',
	'Camlann Mace',
	'Hammer',
	'Polehammer',
	'Great Hammer',
	'Tombhammer',
	'Forge Hammers',
	'Grovekeeper',
	'Quarterstaff',
	'Iron-Clad Staff',
	'Double Bladed Staff',
	'Black Monk Stave',
	'Soulscythe',
	'Staff of Balance',
];

const HealerArray = [
	'Great Holy Staff',
	'Divine Staff',
	'Lifetouch Staff',
	'Fallen Staff',
	'Redemption Staff',
	'Nature Staff',
	'Great Nature Staff',
	'Wild Staff',
	'Druidic Staff',
	'Blight Staff',
	'Rampant Staff',
];

const SupportArray = [
	'Arcane Staff',
	'Great Arcane Staff',
	'Enigmatic Staff',
	'Witchwork Staff',
	'Occult Staff',
	'Malevolent Locus',
	'Icicle Staff',
];

const RangedDpsArray = [
	'Permafrost Prism',
	'Frost Staff',
	'Great Frost Staff',
	'Glacial Staff',
	'Hoarfrost Staff',
	'Cursed Staff',
	'Great Cursed Staff',
	'Demonic Staff',
	'Lifecurse Staff',
	'Cursed Skull',
	'Damnation Staff',
	'Fire Staff',
	'Great Fire Staff',
	'Infernal Staff',
	'Wildfire Staff',
	'Brimstone Staff',
	'Blazing Staff',
	'Bow',
	'Warbow',
	'Longbow',
	'Whispering Bow',
	'Wailing Bow',
	'Bow of Badon',
	'Heavy Crossbow',
	'Crossbow',
	'Light Crossbow',
	'Weeping Repeater',
	'Boltcasters',
	'Siegebow',
];

const MeleeDpsArray = [
	'Pike',
	'Glaive',
	'Heron Spear',
	'Spirithunter',
	'Trinity Spear',
	'Dagger',
	'Dagger Pair',
	'Claws',
	'Bloodletter',
	'Black hands',
	'Deathgivers',
	'Greataxe',
	'Battleaxe',
	'Halberd',
	'Carrioncaller',
	'Infernal Scythe',
	'Bear Paws',
	'Broadsword',
	'Claymore',
	'Dual Swords',
	'Clarent Blade',
	'Carving Sword',
	'Galatine Pair',
];
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
							<div className='text-gray-1000 py-3'>
								{TankArray.map(weapon => {
									const filtertanks = guildsinfo.Tank.filter(
										a => a.weapon === weapon
									);
									if (filtertanks.length !== 0) {
										return <div>{`${weapon}: ${filtertanks.length}`}</div>;
									}

									return null;
								})}
							</div>
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
							<div className='text-gray-1000 py-3'>
								{HealerArray.map(weapon => {
									const filterhealer = guildsinfo.Healer.filter(
										a => a.weapon === weapon
									);
									if (filterhealer.length !== 0) {
										return <div>{`${weapon}: ${filterhealer.length}`}</div>;
									}
									return null;
								})}
							</div>
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
							<div className='text-gray-1000 py-3'>
								{SupportArray.map(weapon => {
									const filtersupport = guildsinfo.Support.filter(
										a => a.weapon === weapon
									);
									if (filtersupport.length !== 0) {
										return <div>{`${weapon}: ${filtersupport.length}`}</div>;
									}
									return null;
								})}
							</div>
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
							<div className='text-gray-1000 py-3'>
								{RangedDpsArray.map(weapon => {
									const filterrangeddps = guildsinfo['Ranged Dps'].filter(
										a => a.weapon === weapon
									);
									if (filterrangeddps.length !== 0) {
										return <div>{`${weapon}: ${filterrangeddps.length}`}</div>;
									}
									return null;
								})}
							</div>
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
							<div className='text-gray-1000 py-3'>
								{MeleeDpsArray.map(weapon => {
									const filtermeleedps = guildsinfo['Melee Dps'].filter(
										a => a.weapon === weapon
									);
									if (filtermeleedps.length !== 0) {
										return <div>{`${weapon}: ${filtermeleedps.length}`}</div>;
									}
									return null;
								})}
							</div>
						</CSSTransition>
					</React.Fragment>
				)}
			</div>

			<div>
				<button
					className='font-bold hover:text-gray-1000'
					onClick={() => setShowGraph(!showGraph)}
				>
					Show Graph
				</button>
				<CSSTransition
					in={showGraph}
					timeout={300}
					classNames='transition'
					unmountOnExit={true}
				>
					<div>
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
				</CSSTransition>
			</div>
		</div>
	);
};

export default ZergGuildCompBox;
