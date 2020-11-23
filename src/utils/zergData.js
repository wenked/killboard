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
	'Energy Shaper',
	'Mistpiercer',
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

const organizeItems = (obj, item) => {
	if (item.LocalizedNames !== null) {
		return Object.assign(obj, {
			[item.UniqueName]: item.LocalizedNames['EN-US'],
		});
	}

	return Object.assign(obj, { nada: 'nada' });
};

/*{BattleInfo.endTime
	.replace(/T/g, ' ')
	.substring(0, BattleInfo.endTime.replace(/T/g, ' ').indexOf('.'))}*/

const convertString = string => {
	return string
		.replace(/T/g, ' ')
		.substring(0, string.replace(/T/g, ' ').indexOf('.'));
};

const getRole = string => {
	if (TankArray.includes(string) === true) {
		return 'Tank';
	}
	if (HealerArray.includes(string) === true) {
		return 'Healer';
	}
	if (SupportArray.includes(string) === true) {
		return 'Support';
	}
	if (RangedDpsArray.includes(string) === true) {
		return 'Ranged Dps';
	}
	if (MeleeDpsArray.includes(string) === true) {
		return 'Melee Dps';
	}
	return 'nda';
};

const handleguild = guild => {
	if (guild === '' || null) {
		return 'No Guild';
	}
	return guild;
};

export {
	MeleeDpsArray,
	TankArray,
	SupportArray,
	HealerArray,
	RangedDpsArray,
	handleguild,
	organizeItems,
	getRole,
	convertString,
};
