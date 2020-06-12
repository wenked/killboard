import React from 'react';
import _ from 'lodash';
import '../styles/main.css';

const ZergComposition = props => {
	const Tank = [
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
		'Soulschythe',
		'Staff of Balance',
	];

	const Healer = [
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

	const Support = [
		'Arcane Staff',
		'Great Arcane Staff',
		'Enigmatic Staff',
		'Witchwork Staff',
		'Occult Staff',
		'Malevolent Locus',
		'Icicle Staff',
	];

	const RangedDps = [
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

	const MeleeDps = [
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
    TANK  --------
    mace
    One-Handed	Heavy Mace
    Two-Handed	Morning Star
    Two-Handed	Bedrock Mace
    One-Handed	Incubus Mace
    One-Handed	Camlann Mace
    Hammer
    One-Handed	Polehammer
    Two-Handed	Great Hammer
    Two-Handed	Tombhammer
    Two-Handed	Forge Hammers
    Two-Handed	Grovekeeper
    Two-Handed
    Quarterstaff
    Two-Handed	Iron-Clad Staff
    Two-Handed	Double Bladed Staff
    Two-Handed	Black Monk Stave
    Two-Handed	Soulscythe
    Two-Handed	Staff of Balance
    Two-Handed

    HEALER
    Holy Staff
    One-Handed	Great Holy Staff
    Two-Handed	Divine Staff
    Two-Handed	Lifetouch Staff
    One-Handed	Fallen Staff
    Two-Handed	Redemption Staff
    Two-Handed
    Nature Staff
    One-Handed	Great Nature Staff
    Two-Handed	Wild Staff
    Two-Handed	Druidic Staff
    One-Handed	Blight Staff
    Two-Handed	Rampant Staff
    Two-Handed

    SUPPORT
    Arcane Staff
    One-Handed	Great Arcane Staff
    Two-Handed	Enigmatic Staff
    Two-Handed	Witchwork Staff
    One-Handed	Occult Staff
    Two-Handed	Malevolent Locus
    Two-Handed
    Icicle Staff
    Two-Handed

    DPS
    Permafrost Prism
    Two-Handed
    Frost Staff
    One-Handed	Great Frost Staff
    Two-Handed	Glacial Staff
    Two-Handed	Hoarfrost Staff
    One-Handed
    Cursed Staff
    One-Handed	Great Cursed Staff
    Two-Handed	Demonic Staff
    Two-Handed	Lifecurse Staff
    One-Handed	Cursed Skull
    Two-Handed	Damnation Staff
    Two-Handed
    Fire Staff
    One-Handed	Great Fire Staff
    Two-Handed	Infernal Staff
    Two-Handed	Wildfire Staff
    One-Handed	Brimstone Staff
    Two-Handed	Blazing Staff
    Two-Handed
    Bow
    Two-Handed	Warbow
    Two-Handed	Longbow
    Two-Handed	Whispering Bow
    Two-Handed	Wailing Bow
    Two-Handed	Bow of Badon
    Two-Handed
    Spear
    One-Handed	Pike
    Two-Handed	Glaive
    Two-Handed	Heron Spear
    One-Handed	Spirithunter
    Two-Handed	Trinity Spear
    Two-Handed
    Dagger
    One-Handed	Dagger Pair
    Two-Handed	Claws
    Two-Handed	Bloodletter
    One-Handed	Black Hands
    Two-Handed	Deathgivers
    Two-Handed
    Crossbow
    Two-Handed	Heavy Crossbow
    Two-Handed	Light Crossbow
    One-Handed	Weeping Repeater
    Two-Handed	Boltcasters
    Two-Handed	Siegebow
    Two-Handed
    Battleaxe
    One-Handed	Greataxe
    Two-Handed	Halberd
    Two-Handed	Carrioncaller
    Two-Handed	Infernal Scythe
    Two-Handed	Bear Paws
    Two-Handed
    Broadsword
    One-Handed	Claymore
    Two-Handed	Dual Swords
    Two-Handed	Clarent Blade
    One-Handed	Carving Sword
    Two-Handed	Galatine Pair
    Two-Handed
    
    ['bloco de rua'].filter( a => a.weapon === camlamn)

    _.groupBy([bloco de rua], a => a.weapon)


    */

	console.log(
		_.map(props.guildzergs, guild => {
			return _.map(guild, weapons =>
				Object.keys(weapons).map(arma => weapons[arma].length)
			);
		}),
		'length'
	);

	return (
		<div className='text-orange-1000 font-bold block py-3 md:inline-grid grid-cols-2 col-gap-4 py-3 lg:inline-grid grid-cols-4 col-gap-4 py-3 xl:inline-grid grid-cols-4 col-gap-4 py-3'>
			{_.map(props.guildzergs, guild => (
				<div>
					{Object.keys(guild)}
					<div>
						{_.map(guild, weapons => (
							<div className='py-2'>
								{'  '}

								{Object.keys(weapons).map(arma => (
									<div className='text-gray-1000'>
										{arma}: {weapons[arma].length}
									</div>
								))}
								{'  '}
								<br />
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default ZergComposition;
