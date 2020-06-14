import React from 'react';

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

/*
<div className='text-orange-1100 py-2 block'>
								<div>
									{rolesComp[i][Object.keys(guild)].Tank !== undefined && (
										<React.Fragment>
											<button
												className='font-bold'
												onClick={() => {
													{
														console.log(rolesComp[i][Object.keys(guild)]);
														setShowTanks(!showTanks);
													}
												}}
											>
												Tanks:
												{rolesComp[i][Object.keys(guild)].Tank.length}
											</button>
											{showTanks ? (
												<div>
													{TankArray.map(weapon => {
														const filtertanks = rolesComp[i][
															Object.keys(guild)
														].Tank.filter(a => a.weapon === weapon);
														if (filtertanks.length !== 0) {
															return (
																<div>{`${weapon}:${filtertanks.length}`}</div>
															);
														}
														return null;
													})}
												</div>
											) : null}
										</React.Fragment>
									)}
								</div>
								<div>
									{rolesComp[i][Object.keys(guild)].Healer !== undefined && (
										<React.Fragment>
											<button
												className='font-bold'
												onClick={() => setShowHealers(!showHealers)}
											>
												Healers:{' '}
												{rolesComp[i][Object.keys(guild)].Healer.length}
											</button>
											{showHealers ? (
												<div>
													{HealerArray.map(weapon => {
														const filterhealers = rolesComp[i][
															Object.keys(guild)
														].Healer.filter(a => a.weapon === weapon);
														if (filterhealers.length !== 0) {
															return (
																<div>{`${weapon}:${filterhealers.length}`}</div>
															);
														}
														return null;
													})}
												</div>
											) : null}
										</React.Fragment>
									)}
								</div>
								<div>
									{rolesComp[i][Object.keys(guild)].Support !== undefined && (
										<React.Fragment>
											<button
												className='font-bold'
												onClick={() => setShowSupports(!showSupports)}
											>
												Supports:{' '}
												{rolesComp[i][Object.keys(guild)].Support.length}
											</button>
											{showSupports ? (
												<div>
													{SupportArray.map(weapon => {
														const filtersupports = rolesComp[i][
															Object.keys(guild)
														].Support.filter(a => a.weapon === weapon);
														if (filtersupports.length !== 0) {
															return (
																<div>{`${weapon}:${filtersupports.length}`}</div>
															);
														}
														return null;
													})}
												</div>
											) : null}
										</React.Fragment>
									)}
								</div>
								<div>
									{rolesComp[i][Object.keys(guild)]['Ranged Dps'] !==
										undefined && (
										<React.Fragment>
											<button
												className='font-bold'
												onClick={() => setShowRangedDps(!showRangedDps)}
											>
												Ranged Dps:{' '}
												{rolesComp[i][Object.keys(guild)]['Ranged Dps'].length}
											</button>
											{showRangedDps ? (
												<div>
													{RangedDpsArray.map(weapon => {
														const filterrangeddps = rolesComp[i][
															Object.keys(guild)
														]['Ranged Dps'].filter(a => a.weapon === weapon);
														if (filterrangeddps.length !== 0) {
															return (
																<div>{`${weapon}:${filterrangeddps.length}`}</div>
															);
														}
														return null;
													})}
												</div>
											) : null}
										</React.Fragment>
									)}
								</div>
								<div>
									{rolesComp[i][Object.keys(guild)]['Melee Dps'] !==
										undefined && (
										<React.Fragment>
											<button
												className='font-bold'
												onClick={() => setShowMeleeDps(!showMeleeDps)}
											>
												Melee Dps:{' '}
												{rolesComp[i][Object.keys(guild)]['Melee Dps'].length}
											</button>
											<ZergGuildCompBox
												meleedps={rolesComp[i][Object.keys(guild)]['Melee Dps']}
												showmeleedps={showMeleeDps}
											/>
										</React.Fragment>
									)}
								</div>
							</div>
*/

const ZergGuildCompBox = props => {
	const [showTanks, setShowTanks] = React.useState(false);
	const [showHealers, setShowHealers] = React.useState(false);
	const [showSupports, setShowSupports] = React.useState(false);
	const [showRangedDps, setShowRangedDps] = React.useState(false);
	const [showMeleeDps, setShowMeleeDps] = React.useState(false);
	const guildsinfo = props.guildsinfo;

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
						{showTanks ? (
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
						) : null}
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
						{showHealers ? (
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
						) : null}
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
						{showSupports ? (
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
						) : null}
					</React.Fragment>
				)}
			</div>
			<div>
				{guildsinfo['Ranged Dps'] !== undefined && (
					<React.Fragment>
						<button
							className='font-bold hover:text-gray-1000'
							onClick={() => setShowRangedDps(!showRangedDps)}
						>
							Ranged Dps: {guildsinfo['Ranged Dps'].length}
						</button>
						{showRangedDps ? (
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
						) : null}
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
						{showMeleeDps ? (
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
						) : null}
					</React.Fragment>
				)}
			</div>
		</div>
	);
};

export default ZergGuildCompBox;
