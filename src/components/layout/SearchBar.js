import React from 'react';
import { Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import '../../styles/main.css';

let myHead;
let searchF;
let iconSize;
let iconCSS;
let divFormCSS;
//let numberInputCSS;
//let divInputNumberWrapper;
let divWrapper;

/*const minplayersOptions = [
	{ value: 0, label: ' > 0' },
	{ value: 20, label: ' > 20' },
	{ value: 50, label: ' > 50' },
];*/

const SearchBar = ({ setSearchTerm, history, location }) => {
	//const battleContext = React.useContext(BattleContext);
	const [localSearch, setLocalSearch] = React.useState('');
	//const [localMinPlayer, setLocalMinPlayer] = React.useState(0);

	const onChangeHandler = (e) => {
		setLocalSearch(e.target.value);
	};

	/*const onChangePlayerCount = (e) => {
		setLocalMinPlayer(e.target.value);
	};*/

	const onFormSubmit = (e) => {
		e.preventDefault();
		//setMinPlayerCount(localMinPlayer);
		setSearchTerm(localSearch);
		//battleContext.preFetching(localSearch, localMinPlayer);

		history.push('/killboards');
	};

	if (location.pathname === '/') {
		myHead = 'justify-center h-full items-center flex';
		searchF =
			'sm: w-full md:w-px400 pl-16 h-10 p-3 border-none rounded-md outline-none w-px400 ';
		iconSize = 'large';
		iconCSS = 'pl-4 pb-10 pt-2';
		divFormCSS = '';
		//numberInputCSS = 'h-10 w-40';
		//divInputNumberWrapper = 'w-3/5 pl-10 pt-2 md:pl-2 md:pt-0 md:pb-4';
		divWrapper = 'pt-8';
	} else {
		myHead = 'pl-8 relative inline-block m-w-100';
		searchF =
			'border-none border border-black rounded-md h-8 w-full pt-1 pr-6 pb-1 pl-8 outline-none m-1 inline-flex';
		iconSize = 'small';
		iconCSS = 'pl-4 pt-4';
		divFormCSS = 'pb-10';
		//numberInputCSS = 'h-8';
		//divInputNumberWrapper = 'pt-1 w-4/5';
		divWrapper = 'pt-4';
	}

	return (
		<div className={divWrapper}>
			<div className={myHead}>
				<div className={divFormCSS}>
					<form onSubmit={onFormSubmit}>
						{location.pathname === '/' && (
							<h1 className='text-gray-1000 text-5xl mb-8  tracking-normal text-center hover:text-orange-1000'>
								KillBoard
							</h1>
						)}
						<div className='block md:inline-flex'>
							<div>
								<button className=' hover:text-orange-1000 absolute'>
									<Icon
										className={`text-gray-1000  ${iconCSS} absolute hover:text-orange-1000`}
										name='search'
										size={iconSize}
									/>
								</button>

								<input
									className={`placeholder-gray-1000 placeholder-opacity-25 bg-gray-1200 text-gray-1000 ${searchF} focus:shadow-outline `}
									type='text'
									value={localSearch}
									onChange={onChangeHandler}
									placeholder='Search guilds Ex:Blue Army'
								/>
							</div>
							{/*	<div className={`pl-2 ${divInputNumberWrapper}`}>
								<input
									className={`placeholder-gray-1000 placeholder-opacity-25 ${numberInputCSS} outline-none pl-4 bg-gray-1200 text-gray-1000 rounded-full focus:shadow-outline`}
									type='number'
									value={localMinPlayer}
									onChange={onChangePlayerCount}
									placeholder='Min. Player Count'
								/>
							</div> */}
						</div>
						{/*<Select
							options={minplayersOptions}
							placeholder='Min players'
							onChange={setMinPlayerCount}
							className={`pl-2 ${divInputNumberWrapper}`}
						/>*/}
					</form>
				</div>
			</div>
		</div>
	);
};

export default withRouter(SearchBar);
