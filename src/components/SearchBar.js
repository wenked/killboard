import React from 'react';
import { Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import './pages/KillboardList.css';
import '../styles/main.css';

//import {Search} from 'semantic-ui-react';
let myHead;
let searchF;
let iconSize;
let iconCSS;
let divFormCSS;
let numberInputCSS;
let divInputNumberWrapper;

const SearchBar = props => {
	const [SearchTerm, setSearchTerm] = React.useState('');
	const [minPlayerCount, setMinPlayerCount] = React.useState(null);

	const onChangeHandler = e => {
		setSearchTerm(e.target.value);
	};

	const onChangePlayerCount = e => {
		setMinPlayerCount(e.target.value);
	};

	const onFormSubmit = e => {
		e.preventDefault();
		props.SubmitFunction(SearchTerm, minPlayerCount);

		props.history.push('/killboards');
	};

	//console.log(Loading);
	if (props.location.pathname === '/') {
		myHead = 'justify-center h-full items-center flex';
		searchF = 'pl-16 h-10 p-3 border-none rounded-full outline-none w-px400';
		iconSize = 'large';
		iconCSS = 'pl-4 pb-10 pt-2';
		divFormCSS = '';
		numberInputCSS = 'h-10 w-40';
		divInputNumberWrapper = 'pl-32 pt-2 md:pl-2 pt-0 pb-4 lg:pt-0 xl:pt-0';
	} else {
		myHead = 'pl-8 relative inline-block m-w-100';
		searchF =
			'border-none border border-black rounded-full h-8 w-full pt-1 pr-6 pb-1 pl-8 outline-none m-1 inline-flex';
		iconSize = 'small';
		iconCSS = 'pl-4 pt-4';
		divFormCSS = 'pb-10';
		numberInputCSS = 'h-8';
		divInputNumberWrapper = 'pt-1';
	}

	//display: inline-flex;
	//color: #d4d4dc;

	return (
		<div>
			<div className={myHead}>
				<div className={divFormCSS}>
					<form onSubmit={onFormSubmit}>
						{props.location.pathname === '/' && (
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
									className={`placeholder-gray-1000 placeholder-opacity-25 bg-gray-800 text-gray-1000 ${searchF} focus:shadow-outline `}
									type='text'
									value={SearchTerm}
									onChange={onChangeHandler}
									placeholder='Guilds'
								/>
							</div>
							<div className={`pl-2 ${divInputNumberWrapper}`}>
								<input
									className={`placeholder-gray-1000 placeholder-opacity-25 ${numberInputCSS} outline-none pl-4 bg-gray-800 text-gray-1000 rounded-full focus:shadow-outline`}
									type='number'
									value={minPlayerCount}
									onChange={onChangePlayerCount}
									placeholder='Min. Player Count'
								/>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default withRouter(SearchBar);
